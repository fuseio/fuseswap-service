import { Service } from 'typedi'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { bridgeClient } from '../graphql/client'
import { getBridgedTokensQuery } from '../graphql/queries'

@Service()
export default class BridgeGraphService {
  private readonly client: ApolloClient<NormalizedCacheObject>

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
