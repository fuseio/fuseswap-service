import { Service } from 'typedi'
import { ETHER as FUSE, Token, Currency } from '@fuseio/fuse-swap-sdk'
import getTokens from '@utils/token/getTokens'
import { CHAIN_ID, TOKEN_MAP } from '@constants/index'
import TokenStat from '@models/tokenStat'
import ProviderService from './provider'
import ContractService from './contract'
import FuseswapGraphService from './fuseswapGraph'
import BlockGraphService from './blockGraph'
import get from 'lodash.get'
import isFuse from '@utils/isFuse'
import { getPercentChange } from '@utils/price'

interface Stat {
  priceUSD: string
  dailyVolumeUSD: string
  date: number
}

@Service()
export default class TokenService {
  constructor (private contractService: ContractService, private fuseswapGraphService: FuseswapGraphService, private blockGraphService: BlockGraphService) {}

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
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const price = await this.fuseswapGraphService.getTokenPrice(address)
    return price.toString()
  }

  async getPreviousTokenPrice (tokenAddress: string, duration: object) : Promise<string> {
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const previousBlock = await this.blockGraphService.getPreviousBlock(duration)
    const [fusePriceDayBack, oneDayHistory] = await Promise.all([this.fuseswapGraphService.getFusePrice(previousBlock), this.fuseswapGraphService.getTokenData(address, previousBlock)])
    const tokenPrice = oneDayHistory?.derivedETH ? oneDayHistory?.derivedETH * fusePriceDayBack : 0
    return tokenPrice.toString()
  }

  async getTokenPriceChange (tokenAddress: string, duration: object): Promise<any> {
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const [currentPrice, previousPrice] = await Promise.all([this.getTokenPrice(address), this.getPreviousTokenPrice(address, duration)])
    const priceChange = getPercentChange(currentPrice, previousPrice)
    return { priceChange: priceChange.toString(), currentPrice, previousPrice }
  }

  async getTokenStats (tokenAddress: string, limit: number): Promise<any> {
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const response = await this.fuseswapGraphService.getTokenStats(address, limit)
    const stats = response.map(
      ({ priceUSD, dailyVolumeUSD, date }: Stat) =>
        new TokenStat(tokenAddress, priceUSD, dailyVolumeUSD, date)
    )
    return stats
  }
}
