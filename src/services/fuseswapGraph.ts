import { Service } from 'typedi'
import {
  getTokenPriceQuery,
  getTokenDailyStatsQuery,
  getFusePriceQuery,
  getTokenDataQuery,
  getLPTokensQuery
} from '../graphql/queries'
import { fuseswapClient } from '../graphql/client'
import { GraphQLClient } from 'graphql-request'

@Service()
export default class FuseswapGraphService {
  private readonly client: GraphQLClient

  constructor () {
    this.client = fuseswapClient
  }

  async getTokenPrice (tokenAddress: string) {
    const normalizedAddress = tokenAddress.toLowerCase()

    const result = await this.client.request(getTokenPriceQuery(normalizedAddress))

    const fusePrice = Number(result?.bundle?.ethPrice)
    const derivedFuse = Number(result?.token?.derivedETH)
    const tokenPrice = fusePrice * derivedFuse
    return isNaN(tokenPrice) ? 0 : tokenPrice
  }

  async getTokenStats (tokenAddress: string, limit: number) {
    const normalizedAddress = tokenAddress.toLowerCase()
    const result = await this.client.request(getTokenDailyStatsQuery(normalizedAddress, limit))
    return result?.tokenDayDatas
  }

  async getFusePrice (blocknumber: number) {
    const result = await this.client.request(getFusePriceQuery(blocknumber))
    return result?.bundles[0]?.ethPrice
  }

  async getTokenData (tokenAddress: string, blocknumber?: number) {
    const normalizedAddress = tokenAddress.toLowerCase()
    const result = await this.client.request(getTokenDataQuery(normalizedAddress, blocknumber))
    return result?.tokens[0]
  }

  async getLPTokens () {
    const result = await this.client.request(getLPTokensQuery())
    return result?.pairs
  }
}
