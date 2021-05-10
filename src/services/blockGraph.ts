import ApolloClient from 'apollo-client'
import { Service } from 'typedi'
import dayjs from '@utils/dayjs'
import { getBlockQuery } from '../apollo/queries'
import { blockClient } from '../apollo/client'
@Service()
export default class BlockGraphService {
    private readonly client: ApolloClient<any>

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

    async getPreviousBlock (duration: any) {
      const currentTime = dayjs()
      const previousTime = currentTime.subtract(duration).unix()
      const oneDayBlock = await this.getBlockFromTimestamp(previousTime)
      return oneDayBlock
    }
}
