import { gql } from '@apollo/client/core'
import { BUNDLE_ID } from '@constants/index'

export function getTokenPriceQuery (tokenAddress: string) {
  const queryString = `
        query {
            bundle(id: "${BUNDLE_ID}") {
                ethPrice
            }
            token(id: "${tokenAddress}") {
                name
                symbol
                derivedETH
            }
        }
    `
  return gql(queryString)
}

export function getTokenDailyStatsQuery (tokenAddress: string, numberOfEntries = 7) {
  const queryString = `
        query {
            tokenDayDatas(where: { token: "${tokenAddress}", }, first: ${numberOfEntries}, orderBy: date, orderDirection: desc) {
                id
                date
                priceUSD
                dailyVolumeUSD
            }
        }
      `
  return gql(queryString)
}

export const getBlockQuery = gql`
  query blocks($timestampFrom: Int!, $timestampTo: Int!) {
    blocks(
      first: 1
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: $timestampFrom, timestamp_lt: $timestampTo }
    ) {
      id
      number
      timestamp
    }
  }
`

export const getFusePriceQuery = (block: number) => {
  const queryString = block
    ? `
    query bundles {
      bundles(where: { id: ${BUNDLE_ID} } block: {number: ${block}}) {
        id
        ethPrice
      }
    }
  `
    : ` query bundles {
      bundles(where: { id: ${BUNDLE_ID} }) {
        id
        ethPrice
      }
    }
  `
  return gql(queryString)
}

const TokenFields = `
  fragment TokenFields on Token {
    id
    name
    symbol
    derivedETH
    tradeVolume
    tradeVolumeUSD
    untrackedVolumeUSD
    totalLiquidity
    txCount
  }
`

export const getTokenDataQuery = (tokenAddress: string, block?: number) => {
  const queryString = `
    ${TokenFields}
    query tokens {
      tokens(${block ? `block : {number: ${block}}` : ''} where: {id:"${tokenAddress}"}) {
        ...TokenFields
      }
      pairs0: pairs(where: {token0: "${tokenAddress}"}, first: 50, orderBy: reserveUSD, orderDirection: desc){
        id
      }
      pairs1: pairs(where: {token1: "${tokenAddress}"}, first: 50, orderBy: reserveUSD, orderDirection: desc){
        id
      }
    }
  `

  return gql(queryString)
}

export const getBridgedTokensQuery = () => {
  const queryString = `
    query {
      bridgedTokens {
        name
        symbol
        address
        decimals
        foreignAddress
      }
    }
  `
  return gql(queryString)
}

export const getLPTokensQuery = () => {
  const queryString = `
    query {
      pairs {
        id
        token0 {
          id
          name
          symbol
          decimals
        }
        token1 {
          id
          name
          symbol
          decimals
        }
      }
    }
  `
  return gql(queryString)
}

export const getBlocksQuery = (timestamps: Array<number>) => {
  let queryString = 'query blocks {'
  queryString += timestamps.map((timestamp) => {
    return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
      timestamp + 600
    } }) {
      number
    }`
  })
  queryString += '}'
  return gql(queryString)
}

export const getPricesByBlockQuery = (tokenAddress: string, blocks: Array<any>) => {
  let queryString = 'query blocks {'
  queryString += blocks.map(
    (block) => `
      t${block.timestamp}:token(id:"${tokenAddress}", block: { number: ${block.number} }) { 
        derivedETH
      }
    `
  )
  queryString += ','
  queryString += blocks.map(
    (block) => `
      b${block.timestamp}: bundle(id:"1", block: { number: ${block.number} }) { 
        ethPrice
      }
    `
  )
  queryString += '}'
  return gql(queryString)
}

export const getSubgraphHealth = gql`
  query health {
    indexingStatusForCurrentVersion(subgraphName: "voltfinance/voltage-exchange") {
      synced
      health
      chains {
        chainHeadBlock {
          number
        }
        latestBlock {
          number
        }
      }
    }
  }
`
