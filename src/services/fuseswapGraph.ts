import { Service } from 'typedi'
import { GraphQLClient } from 'graphql-request'
import {
  getTokenPriceQuery,
  getTokenDailyStatsQuery,
  getFusePriceQuery,
  getTokenDataQuery,
  getLPTokensQuery
} from '../graphql/queries'
import { fuseswapClient } from '../graphql/client'

@Service()
export default class FuseswapGraphService {
    private readonly client: GraphQLClient

    constructor () {
      this.client = fuseswapClient
    }

    async getTokenPrice (tokenAdress: string) {
      const normalizedAddress = tokenAdress.toLowerCase()

      const result = await this.client.request(getTokenPriceQuery(normalizedAddress))

      const fusePrice = Number(result?.bundle?.ethPrice)
      const derivedFuse = Number(result?.token?.derivedETH)
      const tokenPrice = fusePrice * derivedFuse
      return isNaN(tokenPrice) ? 0 : tokenPrice
    }

    async getTokenStats (tokenAdress: string, limit: number) {
      const normalizedAddress = tokenAdress.toLowerCase()
      const result = await this.client.request(getTokenDailyStatsQuery(normalizedAddress, limit))
      return result?.tokenDayDatas
    }

    async getFusePrice (blocknumber: number) {
      const result = await this.client.request(getFusePriceQuery(blocknumber))
      return result?.bundles[0]?.ethPrice
    }

    async getTokenData (tokenAdress: string, blocknumber?: number) {
      const normalizedAddress = tokenAdress.toLowerCase()
      const result = await this.client.request(getTokenDataQuery(normalizedAddress, blocknumber))
      return result?.tokens[0]
    }

    async getLPTokens () {
      const result = await this.client.request(getLPTokensQuery())
      return result?.pairs
    }
}
