import { Token, Pair } from '@fuseio/fuse-swap-sdk'

export default function getPairAddresses(
  tokens: (Token | undefined)[][]
): (string | undefined)[] {
  return tokens.map(([tokenA, tokenB]) => {
    return tokenA && tokenB && !tokenA.equals(tokenB)
      ? Pair.getAddress(tokenA, tokenB)
      : undefined
  })
}
