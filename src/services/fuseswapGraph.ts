import ApolloClient from 'apollo-client'
import { Service } from 'typedi'
import { getTokenPriceQuery, getTokenDailyStatsQuery } from '../apollo/queries'
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

      return fusePrice * derivedFuse
    }

    async getTokenStats (tokenAdress: string, limit: number) {
      const normalizedAddress = tokenAdress.toLowerCase()

      const result = await this.client.query({
        query: getTokenDailyStatsQuery(normalizedAddress, limit)
      })

      return result?.data?.tokenDayDatas
    }
}
