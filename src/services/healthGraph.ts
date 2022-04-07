import { Service } from 'typedi'
import { getSubgraphHealth } from '../graphql/queries'
import { healthClient } from '../graphql/client'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

@Service()
export default class HealthGraphService {
  private readonly client: ApolloClient<NormalizedCacheObject>

  constructor () {
    this.client = healthClient
  }

  async getLatestBlocks () {
    const res = await this.client.query({
      query: getSubgraphHealth
    })
    const latestBlock = res.data.indexingStatusForCurrentVersion.chains[0].latestBlock.number
    const headBlock = res.data.indexingStatusForCurrentVersion.chains[0].chainHeadBlock.number
    return { latestBlock, headBlock }
  }
}
