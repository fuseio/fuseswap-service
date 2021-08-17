import ApolloClient from 'apollo-client'
import { bridgeClient } from '../apollo/client'
import { getBridgedTokensQuery } from '../apollo/queries'
import { Service } from 'typedi'

@Service()
export default class BridgeGraphService {
    private readonly client: ApolloClient<any>

    constructor () {
      this.client = bridgeClient
    }

    async getBridgedTokens () {
      const result = await this.client.query({
        query: getBridgedTokensQuery(),
        fetchPolicy: 'cache-first'
      })
      return result?.data?.bridgedTokens
    }
}
