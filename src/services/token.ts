import { Service } from 'typedi'
import { ETHER as FUSE, Token, Currency } from '@fuseio/fuse-swap-sdk'
import getTokens from '@utils/token/getTokens'
import ProviderService from './provider'
import { CHAIN_ID, WFUSE_ADDRESSS, ZERO_ADDRESS } from '@constants/index'
import ContractService from './contract'
import FuseswapGraphService from './fuseswapGraph'
import get from 'lodash.get'

class TokenStat {
  date: Date;

  constructor(public address: string, public price: string, public volume: string, public timestamp: number) {
    this.date = new Date(timestamp * 1000)
  }

}


const tokensMapping = {
  [ZERO_ADDRESS]: WFUSE_ADDRESSS,
  '0x249be57637d8b013ad64785404b24aebae9b098b': '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5'
}

@Service()
export default class TokenService {
  constructor (private contractService: ContractService, private fuseswapGraphService: FuseswapGraphService) {}

  static getTokenAddressForAnalytics(tokenAddress: string): string {
    return get(tokensMapping, tokenAddress.toLowerCase(), tokenAddress.toLowerCase())
  }

  async getToken (tokenAddress: string): Promise<Currency | undefined> {
    if (!tokenAddress) return

    if (tokenAddress === FUSE.symbol) return FUSE

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
    const address = TokenService.getTokenAddressForAnalytics(tokenAddress)
    const price = await this.fuseswapGraphService.getTokenPrice(address)
    return price.toString()
  }

  async getTokenPriceChange (tokenAddress: string): Promise<any> {
    const currentPrice = await this.getTokenPrice(tokenAddress)
    if (!currentPrice) {
      return  null
    }
    const openingStat = await this.getTokenStats(tokenAddress, 1)
    if (openingStat.length == 0) {
      return null
    }
    const openingPrice = openingStat[0].price
    const priceChange = ((Number(currentPrice) - Number(openingPrice)) / Number(openingPrice)).toString()
    return {priceChange, currentPrice, openingStat}
  }

  async getTokenStats (tokenAddress: string, limit: number): Promise<any> {
    const address = TokenService.getTokenAddressForAnalytics(tokenAddress)
    const response = await this.fuseswapGraphService.getTokenStats(address, limit)
    const stats = response.map((stat: { priceUSD: string; dailyVolumeUSD: string; date: number }) =>
      new TokenStat(tokenAddress, stat.priceUSD, stat.dailyVolumeUSD, stat.date))
    return stats
  }
}
