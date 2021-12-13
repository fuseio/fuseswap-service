import { GraphQLClient } from 'graphql-request'
import config from 'config'

const timeout = parseInt(config.get('api.timeout'))

export const fuseswapClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuseswap', {
  timeout
})

export const blockClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuse-blocks', {
  timeout
})

export const bridgeClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuse-ethereum-bridged-tokens', {
  timeout
})
