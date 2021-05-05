import ApolloClient from 'apollo-client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Service } from 'typedi'
import { getBlockQuery } from '../apollo/queries'
import { blockClient } from '../apollo/client'

dayjs.extend(utc)

@Service()
export default class BlockGraphService {
    private readonly client: ApolloClient<any>

    constructor () {
      this.client = blockClient
    }

    async getBlockFromTimestamp(timestamp: number) {
      let result = await this.client.query({
        query: getBlockQuery,
        variables: {
          timestampFrom: timestamp,
          timestampTo: timestamp + 600,
        },
        fetchPolicy: 'cache-first',
      })
      return result?.data?.blocks?.[0]?.number
    }

    async getBlockOneDayBack() {
      const utcCurrentTime = dayjs()
      const utcOneDayBack = utcCurrentTime.subtract(1, 'day').unix()
      let oneDayBlock = await this.getBlockFromTimestamp(utcOneDayBack)
      return oneDayBlock
    }
}
