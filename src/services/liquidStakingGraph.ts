import { formatEther } from '@ethersproject/units'
import { GraphQLClient } from 'graphql-request'
import { Service } from 'typedi'
import { liquidStakingClient } from '../graphql/client'
import { getLiquidStakingsQuery } from '../graphql/queries'

@Service()
export default class LiquidStakingGraphService {
  private readonly client: GraphQLClient

  constructor () {
    this.client = liquidStakingClient
  }

  async getRatio () {
    const result = await this.client.request(getLiquidStakingsQuery)
    return Number(formatEther(result?.liquidStakings?.[0]?.ratio ?? '0'))
  }
}
