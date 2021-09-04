import { GraphQLClient } from 'graphql-request'

export const fuseswapClient = new GraphQLClient('https://graph.fuse.io/subgraphs/name/fuseio/fuseswap')

export const blockClient = new GraphQLClient('https://graph.fuse.io/subgraphs/name/fuseio/fuse-blocks')

export const bridgeClient = new GraphQLClient('https://graph.fuse.io/subgraphs/name/fuseio/fuse-ethereum-bridge')
