import { Service } from 'typedi'
import config from 'config'
import { ETHER as FUSE, Token, Currency } from '@voltage-finance/sdk'
import getTokens from '@utils/token/getTokens'
import { CHAIN_ID, SFUSE_ADDRESS, TOKEN_MAP, VOLTAGE_DEPLOYMENT_TIMESTAMP, VOLT_ADDRESS, WFUSE_ADDRESS, XVOLT_ADDRESS } from '@constants/index'
import TokenStat from '@models/tokenStat'
import ProviderService from './provider'
import ContractService from './contract'
import FuseswapGraphService from './fuseswapGraph'
import BlockGraphService from './blockGraph'
import HealthGraphService from './healthGraph'
import { get } from 'lodash'
import isFuse from '@utils/isFuse'
import { getPercentChange } from '@utils/price'
import { Duration } from 'dayjs/plugin/duration'
import dayjs from '@utils/dayjs'
import { getTimestamps, splitQuery } from '@utils/index'
import { getPricesByBlockQuery } from '../graphql/queries'
import { fuseswapClient } from '../graphql/client'
import BarGraphService from './barGraph'
import isStringEqual from '@utils/isStringEqual'
import LiquidStakingGraphService from './liquidStakingGraph'

interface Stat {
  priceUSD: string
  dailyVolumeUSD: string
  date: number
}

export enum TimeFrame {
  ALL = 'ALL',
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  DAY = 'DAY',
  HOUR = 'HOUR',
}

@Service()
export default class TokenService {
  constructor (
    private contractService: ContractService,
    private fuseswapGraphService: FuseswapGraphService,
    private blockGraphService: BlockGraphService,
    private healthGraphService: HealthGraphService,
    private barGraphService: BarGraphService,
    private liquidStakingGraphService: LiquidStakingGraphService
  ) {}

  static getTokenAddressFromTokenMap (tokenAddress: string): string {
    return get(TOKEN_MAP, tokenAddress, tokenAddress)
  }

  async getToken (tokenAddress: string): Promise<Currency | undefined> {
    if (!tokenAddress) return

    if (isFuse(tokenAddress)) return FUSE

    const tokens = getTokens()
    const token: Token | undefined = tokens[tokenAddress]

    if (token) {
      return token
    } else {
      const tokenContract = this.contractService.getTokenContract(
        tokenAddress,
        ProviderService.getProvider()
      )

      const name = await tokenContract.name()
      const decimals = await tokenContract.decimals()
      const symbol = await tokenContract.symbol()

      return new Token(CHAIN_ID, tokenAddress, decimals, symbol, name)
    }
  }

  async getTokenPrice (tokenAddress: string): Promise<string> {
    let price: number

    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)

    if (isStringEqual(address, SFUSE_ADDRESS)) {
      const ratio = await this.liquidStakingGraphService.getRatio()
      const fusePrice = await this.fuseswapGraphService.getTokenPrice(WFUSE_ADDRESS)
      price = ratio * fusePrice
    } else if (isStringEqual(address, XVOLT_ADDRESS)) {
      const ratio = await this.barGraphService.getRatio()
      const voltPrice = await this.fuseswapGraphService.getTokenPrice(VOLT_ADDRESS)
      price = ratio * voltPrice
    } else {
      price = await this.fuseswapGraphService.getTokenPrice(address)
    }

    return price.toString()
  }

  async getPreviousTokenPrice (tokenAddress: string, duration: Duration) : Promise<string> {
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const previousBlock = await this.blockGraphService.getPreviousBlock(duration)
    const [fusePriceDayBack, oneDayHistory] = await Promise.all([this.fuseswapGraphService.getFusePrice(previousBlock), this.fuseswapGraphService.getTokenData(address, previousBlock)])
    const tokenPrice = oneDayHistory?.derivedETH ? oneDayHistory?.derivedETH * fusePriceDayBack : 0
    return tokenPrice.toString()
  }

  async getTokenPriceChange (tokenAddress: string, duration: Duration): Promise<any> {
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const [currentPrice, previousPrice] = await Promise.all([this.getTokenPrice(address), this.getPreviousTokenPrice(address, duration)])
    const priceChange = getPercentChange(currentPrice, previousPrice)
    return { priceChange: priceChange.toString(), currentPrice, previousPrice }
  }

  async getTokenStats (tokenAddress: string, limit: number): Promise<any> {
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const response = await this.fuseswapGraphService.getTokenStats(address, limit)
    return response.map(({ priceUSD, dailyVolumeUSD, date }: Stat) =>
      new TokenStat(tokenAddress, priceUSD, dailyVolumeUSD, date)
    )
  }

  async getTokenPriceChangeInterval (tokenAddress: string, timeFrame = TimeFrame.MONTH) {
    const MAX_RESULT_SIZE: number = config.get('maxResultSize')
    const currentTime = dayjs.utc()
    const windowSize: any = timeFrame.toLowerCase()
    const time = timeFrame === TimeFrame.ALL
      ? VOLTAGE_DEPLOYMENT_TIMESTAMP
      : currentTime.subtract(1, windowSize).startOf('hour').unix()
    const secondsInTimeFrame = currentTime.unix() - time
    const interval = parseInt((secondsInTimeFrame / MAX_RESULT_SIZE).toString())
    const timestamps = getTimestamps(time, interval)

    if (timestamps.length === 0) {
      return []
    }

    let blocks = await this.blockGraphService.getBlocksFromTimestamp(timestamps, 100)

    if (!blocks || blocks.length === 0) {
      return []
    }

    const { latestBlock } = await this.healthGraphService.getLatestBlocks()

    if (latestBlock) {
      blocks = blocks.filter(b => parseFloat(b.number) <= parseFloat(latestBlock))
    }

    const result: any = await splitQuery(
      getPricesByBlockQuery,
      fuseswapClient,
      [tokenAddress],
      blocks
    )

    let values: Array<any> = []
    for (const row in result) {
      const timestamp = parseFloat(row.split('t')[1])
      const derivedETH = parseFloat(result[row]?.derivedETH)
      const blockPrice = result['b' + timestamp]
      if (timestamp) {
        values.push({
          timestamp,
          derivedETH,
          priceUSD: derivedETH * blockPrice?.ethPrice
        })
      }
    }

    values = values.sort((a, b) => a.timestamp - b.timestamp)

    const formattedHistory = []
    for (let i = 0; i < values.length - 1; i++) {
      const previousPrice = parseFloat(values[i].priceUSD) || 0
      const currentPrice = parseFloat(values[i + 1].priceUSD) || 0
      formattedHistory.push({
        timestamp: values[i].timestamp,
        priceChange: getPercentChange(currentPrice.toString(), previousPrice.toString()),
        previousPrice,
        currentPrice
      })
    }

    return formattedHistory
  }
}
