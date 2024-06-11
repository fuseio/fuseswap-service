import { GraphQLClient } from 'graphql-request'
import config from 'config'

const timeout = parseInt(config.get('api.timeout'))

export const fuseswapClient = new GraphQLClient('https://gateway-arbitrum.network.thegraph.com/api/3f81974147b5b63470524ed08206e24e/subgraphs/id/4buFyoUT8Lay3T1DK9ctdMdcpkZMdi5EpCBWZCBTKvQd', {
  timeout
})

export const blockClient = new GraphQLClient('https://gateway-arbitrum.network.thegraph.com/api/3f81974147b5b63470524ed08206e24e/subgraphs/id/4NdGNtBYVAuWriUfcb58vLmiaendp7v8EQ9tGe3i1RPo', {
  timeout
})

export const bridgeClient = new GraphQLClient('https://gateway-arbitrum.network.thegraph.com/api/3f81974147b5b63470524ed08206e24e/subgraphs/id/3THneDa4GzN2avVU3fTzeK4QJU4eVKuJVsniQhMNGLmU', {
  timeout
})

export const healthClient = new GraphQLClient('https://api.thegraph.com/index-node/graphql', {
  timeout
})

export const barClient = new GraphQLClient('https://gateway-arbitrum.network.thegraph.com/api/3f81974147b5b63470524ed08206e24e/subgraphs/id/AH6ViHt7LJJEiBJPBY1u7RQF737CRs4uk6a9uvMcSTZJ', {
  timeout
})

export const liquidStakingClient = new GraphQLClient('https://gateway-arbitrum.network.thegraph.com/api/3f81974147b5b63470524ed08206e24e/subgraphs/id/7FQVAoYfsrYPAVzaHnky1rHGYjXj2hcw3yokeLQmpntp', { timeout })
