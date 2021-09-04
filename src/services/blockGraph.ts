import { Service } from 'typedi'
import dayjs from '@utils/dayjs'
import { getBlockQuery } from '../graphql/queries'
import { blockClient } from '../graphql/client'
import { GraphQLClient } from 'graphql-request'

@Service()
export default class BlockGraphService {
    private readonly client: GraphQLClient

    constructor () {
      this.client = blockClient
    }

    async getBlockFromTimestamp (timestamp: number) {
      const result = await this.client.request(getBlockQuery, {
        timestampFrom: timestamp,
        timestampTo: timestamp + 600
      })
      return result?.blocks?.[0]?.number
    }

    async getPreviousBlock (duration: any) {
      const currentTime = dayjs()
      const previousTime = currentTime.subtract(duration).unix()
      const oneDayBlock = await this.getBlockFromTimestamp(previousTime)
      return oneDayBlock
    }
}
