import 'isomorphic-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'

export const fuseswapClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.fuse.io/subgraphs/name/fuseio/fuseswap'
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
})
