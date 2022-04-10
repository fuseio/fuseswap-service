import { Service } from 'typedi'
import { GraphQLClient } from 'graphql-request'
import { bridgeClient } from '../graphql/client'
import { getBridgedTokensQuery } from '../graphql/queries'

@Service()
export default class BridgeGraphService {
  private readonly client: GraphQLClient

  constructor () {
    this.client = bridgeClient
  }

  async getBridgedTokens () {
    const result = await this.client.request(getBridgedTokensQuery())
    return result?.bridgedTokens
  }
}
