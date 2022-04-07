import { getAddress } from '@ethersproject/address'
import dayjs from 'dayjs'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export const buildTokenLogoUri = (address: string) => {
  try {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getAddress(address)}/logo.png`
  } catch (e) {
    console.error('Failed to buildTokenLogoUri', e)
  }
}

export const splitQuery = async (
  query: any,
  localClient: ApolloClient<NormalizedCacheObject>,
  vars: Array<any>,
  list: Array<any>,
  skipCount = 100
) => {
  let fetchedData = {}
  let allFound = false
  let skip = 0

  while (!allFound) {
    let end = list.length
    if (skip + skipCount < list.length) {
      end = skip + skipCount
    }

    const sliced = list.slice(skip, end)
    const result = await localClient.query({
      query: query(...vars, sliced),
      fetchPolicy: 'cache-first'
    })

    fetchedData = {
      ...fetchedData,
      ...result
    }

    if (Object.keys(result).length < skipCount || skip + skipCount > list.length) {
      allFound = true
    } else {
      skip += skipCount
    }
  }

  return fetchedData
}

export const getTimestamps = (startTime: number, interval = 3600) => {
  const timestamps: Array<number> = []
  const utcEndTime = dayjs.utc()
  let time = startTime

  while (time < utcEndTime.unix()) {
    timestamps.push(time)
    time += interval
  }

  return timestamps
}
