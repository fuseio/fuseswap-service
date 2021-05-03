import { Service } from 'typedi'
import { ETHER as FUSE, Token, Currency } from '@fuseio/fuse-swap-sdk'
import getTokens from '@utils/token/getTokens'
import { CHAIN_ID, TOKEN_MAP } from '@constants/index'
import TokenStat from '@models/tokenStat'
import ProviderService from './provider'
import ContractService from './contract'
import FuseswapGraphService from './fuseswapGraph'
import get from 'lodash.get'
import isFuse from '@utils/isFuse'

interface Stat {
  priceUSD: string
  dailyVolumeUSD: string
  date: number
}

@Service()
export default class TokenService {
  constructor (private contractService: ContractService, private fuseswapGraphService: FuseswapGraphService) {}

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

  async getTokenPrice (tokenAddress: string): Promise<string | undefined> {
    const address = TokenService.getTokenAddressFromTokenMap(tokenAddress)
    const price = await this.fuseswapGraphService.getTokenPrice(address)
    return price.toString()
  }

  async getTokenPriceChange (tokenAddress: string): Promise<any> {
    const currentPrice = await this.getTokenPrice(tokenAddress)
    const openingStat = await this.getTokenStats(tokenAddress, 1)
    if (openingStat.length === 0) {
      return { priceChange: 0, currentPrice: 0, openingStat: new TokenStat(tokenAddress, '0', '0', Math.round(new Date().getTime() / 1000)) }
    }
    const openingPrice = openingStat[0].price
    const priceChange = ((Number(currentPrice) - Number(openingPrice)) / Number(openingPrice)).toString()
    return { priceChange, currentPrice, openingStat }
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
