import { Service } from 'typedi'
import dayjs from '@utils/dayjs'
import { getBlockQuery, getBlocksQuery } from '../graphql/queries'
import { blockClient } from '../graphql/client'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { splitQuery } from '@utils/index'

@Service()
export default class BlockGraphService {
  private readonly client: ApolloClient<NormalizedCacheObject>

  constructor () {
    this.client = blockClient
  }

  async getBlockFromTimestamp (timestamp: number) {
    const result = await this.client.query({
      query: getBlockQuery,
      variables: {
        timestampFrom: timestamp,
        timestampTo: timestamp + 600
      },
      fetchPolicy: 'cache-first'
    })
    return result?.data?.blocks?.[0]?.number
  }

  async getBlocksFromTimestamp (timestamps: Array<number>, skipCount = 500) {
    if (timestamps?.length === 0) {
      return []
    }

    const response: any = await splitQuery(getBlocksQuery, blockClient, [], timestamps, skipCount)
    const fetchedData = response?.data

    const blocks = []

    if (fetchedData) {
      for (const t in fetchedData) {
        if (fetchedData[t].length > 0) {
          blocks.push({
            timestamp: t.split('t')[1],
            number: fetchedData[t][0].number
          })
        }
      }
    }
    return blocks
  }

  async getPreviousBlock (duration: any) {
    const currentTime = dayjs()
    const previousTime = currentTime.subtract(duration).unix()
    const oneDayBlock = await this.getBlockFromTimestamp(previousTime)
    return oneDayBlock
  }
}
