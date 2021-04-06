import gql from 'graphql-tag'
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
