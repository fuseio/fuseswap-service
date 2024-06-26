import { Service } from 'typedi'
import { getSubgraphHealth } from '../graphql/queries'
import { healthClient } from '../graphql/client'
import { GraphQLClient } from 'graphql-request'

@Service()
export default class HealthGraphService {
  private readonly client: GraphQLClient

  constructor () {
    this.client = healthClient
  }

  async getLatestBlocks () {
    const resArr = await this.client.request(getSubgraphHealth)
    const res = resArr[0]
    const latestBlock = res.indexingStatusForCurrentVersion.chains[0].latestBlock.number
    const headBlock = res.indexingStatusForCurrentVersion.chains[0].chainHeadBlock.number
    return { latestBlock, headBlock }
  }
}
