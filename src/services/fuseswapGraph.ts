import { Service } from 'typedi'
import {
  getTokenPriceQuery,
  getTokenDailyStatsQuery,
  getFusePriceQuery,
  getTokenDataQuery,
  getLPTokensQuery
} from '../graphql/queries'
import { fuseswapClient } from '../graphql/client'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

@Service()
export default class FuseswapGraphService {
  private readonly client: ApolloClient<NormalizedCacheObject>

  constructor () {
    this.client = fuseswapClient
  }

  async getTokenPrice (tokenAdress: string) {
    const normalizedAddress = tokenAdress.toLowerCase()

    const result = await this.client.query({
      query: getTokenPriceQuery(normalizedAddress),
      fetchPolicy: 'cache-first'
    })

    const fusePrice = Number(result?.data?.bundle?.ethPrice)
    const derivedFuse = Number(result?.data?.token?.derivedETH)
    const tokenPrice = fusePrice * derivedFuse
    return isNaN(tokenPrice) ? 0 : tokenPrice
  }

  async getTokenStats (tokenAdress: string, limit: number) {
    const normalizedAddress = tokenAdress.toLowerCase()
    const result = await this.client.query({
      query: getTokenDailyStatsQuery(normalizedAddress, limit),
      fetchPolicy: 'cache-first'
    })
    return result?.data?.tokenDayDatas
  }

  async getFusePrice (blocknumber: number) {
    const result = await this.client.query({
      query: getFusePriceQuery(blocknumber),
      fetchPolicy: 'cache-first'
    })
    return result?.data?.bundles[0]?.ethPrice
  }

  async getTokenData (tokenAdress: string, blocknumber?: number) {
    const normalizedAddress = tokenAdress.toLowerCase()
    const result = await this.client.query({
      query: getTokenDataQuery(normalizedAddress, blocknumber),
      fetchPolicy: 'cache-first'
    })
    return result?.data?.tokens[0]
  }

  async getLPTokens () {
    const result = await this.client.query({
      query: getLPTokensQuery(),
      fetchPolicy: 'cache-first'
    })
    return result?.data?.pairs
  }
}
