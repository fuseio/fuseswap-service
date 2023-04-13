import { GraphQLClient } from 'graphql-request'
import config from 'config'

const timeout = parseInt(config.get('api.timeout'))

export const fuseswapClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/voltfinance/voltage-exchange', {
  timeout
})

export const blockClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuse-blocks', {
  timeout
})

export const bridgeClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuse-ethereum-bridged-tokens', {
  timeout
})

export const healthClient = new GraphQLClient('https://api.thegraph.com/index-node/graphql', {
  timeout
})

export const barClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/voltfinance/volt-bar', {
  timeout
})

export const liquidStakingClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/voltfinance/fuse-liquid-staking', { timeout })
