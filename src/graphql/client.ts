import { GraphQLClient } from 'graphql-request'

export const fuseswapClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuseswap')

export const blockClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuse-blocks')

export const bridgeClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/fuseio/fuse-ethereum-bridged-tokens')
