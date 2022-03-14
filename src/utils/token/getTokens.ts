import listToTokenMap from './listToTokenMap'
import tokenList from '@voltage-finance/swap-default-token-list'
import { ChainId } from '@voltage-finance/sdk'

export default function getTokens (): any {
  return listToTokenMap(tokenList)[ChainId.FUSE]
}
