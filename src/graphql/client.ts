import fetch from 'cross-fetch'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

export const fuseswapClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/voltfinance/voltage-exchange',
    fetch
  }),
  cache: new InMemoryCache()
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/index-node/graphql',
    fetch
  }),
  cache: new InMemoryCache()
})

export const bridgeClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/fuseio/fuse-ethereum-bridged-tokens',
    fetch
  }),
  cache: new InMemoryCache()
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/fuseio/fuse-blocks',
    fetch
  }),
  cache: new InMemoryCache()
})
