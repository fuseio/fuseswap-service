import listToTokenMap from './listToTokenMap'
import tokenList from '@fuseswap/default-token-list'
import { ChainId } from '@fuseio/fuse-swap-sdk'

export default function getTokens(): any {
  return listToTokenMap(tokenList)[ChainId.FUSE]
}
