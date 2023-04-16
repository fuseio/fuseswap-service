import { GraphQLClient } from 'graphql-request'
import { Service } from 'typedi'
import { getBarsQuery } from '../graphql/queries'
import { barClient } from '../graphql/client'

@Service()
export default class BarGraphService {
  private readonly client: GraphQLClient

  constructor () {
    this.client = barClient
  }

  async getRatio () {
    const result = await this.client.request(getBarsQuery)
    return result?.bars?.[0]?.ratio
  }
}
