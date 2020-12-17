import { Token, Pair } from '@fuseio/fuse-swap-sdk'
import uniq from 'lodash.uniq'

export default function getPairAddresses(
  tokens: (Token | undefined)[][]
): (string | undefined)[] {
  return uniq(
    tokens.map(([tokenA, tokenB]) => {
      return tokenA && tokenB && !tokenA.equals(tokenB)
        ? Pair.getAddress(tokenA, tokenB)
        : undefined
    })
  )
}
