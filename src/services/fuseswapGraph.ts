import ApolloClient from 'apollo-client'
import { Service } from 'typedi'
import { getTokenPriceQuery, getTokenDailyStatsQuery, getFusePriceQuery, getTokenDataQuery, getLPTokensQuery } from '../apollo/queries'
import { fuseswapClient } from '../apollo/client'

@Service()
export default class FuseswapGraphService {
    private readonly client: ApolloClient<any>

    constructor () {
      this.client = fuseswapClient
    }

    async getTokenPrice (tokenAdress: string) {
      const normalizedAddress = tokenAdress.toLowerCase()

      const result = await this.client.query({
        query: getTokenPriceQuery(normalizedAddress)
      })

      const fusePrice = Number(result?.data?.bundle?.ethPrice)
      const derivedFuse = Number(result?.data?.token?.derivedETH)
      const tokenPrice = fusePrice * derivedFuse
      return isNaN(tokenPrice) ? 0 : tokenPrice
    }

    async getTokenStats (tokenAdress: string, limit: number) {
      const normalizedAddress = tokenAdress.toLowerCase()

      const result = await this.client.query({
        query: getTokenDailyStatsQuery(normalizedAddress, limit)
      })

      return result?.data?.tokenDayDatas
    }

    async getFusePrice (blocknumber: number) {
      const result = await this.client.query({
        query: getFusePriceQuery(blocknumber)
      })
      const price = result?.data?.bundles[0]?.ethPrice
      return price
    }

    async getTokenData (tokenAdress: string, blocknumber?: number) {
      const normalizedAddress = tokenAdress.toLowerCase()

      const result = await this.client.query({
        query: getTokenDataQuery(normalizedAddress, blocknumber)
      })
      return result.data.tokens[0]
    }

    async getLPTokens () {
      const result = await this.client.query({
        query: getLPTokensQuery()
      })

      return result?.data?.pairs
    }
}
