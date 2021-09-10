import { getAddress } from '@ethersproject/address'
import dayjs from 'dayjs'
import { GraphQLClient } from 'graphql-request'

export const buildTokenLogoUri = (address: string) => {
  try {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getAddress(address)}/logo.png`
  } catch (e) {
    console.error('Failed to buildTokenLogoUri', e)
  }
}

export const splitQuery = async (
  query: any,
  localClient: GraphQLClient,
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
    const result = await localClient.request(query(...vars, sliced))

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
  const currentTime = dayjs.utc()
  let time = startTime

  while (time < currentTime.unix()) {
    timestamps.push(time)
    time += interval
  }

  return timestamps
}
