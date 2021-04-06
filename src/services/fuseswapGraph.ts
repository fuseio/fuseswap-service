import 'isomorphic-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { getTokenPriceQuery } from '../apollo/queries'
import { Service } from 'typedi'

@Service()
export default class FuseswapGraphService {
    private readonly client: ApolloClient<any>

    constructor () {
      this.client = new ApolloClient({
        link: new HttpLink({
          uri: 'https://graph.fuse.io/subgraphs/name/fuseio/fuseswap'
        }),
        cache: new InMemoryCache()
      })
    }

    async getTokenPrice (tokenAdress: string) {
      const normalizedAddress = tokenAdress.toLowerCase()

      const result = await this.client.query({
        query: getTokenPriceQuery(normalizedAddress),
        fetchPolicy: 'cache-first'
      })

      const fusePrice = Number(result?.data?.bundle?.ethPrice)
      const derivedFuse = Number(result?.data?.token?.derivedETH)

      return fusePrice * derivedFuse
    }
}
