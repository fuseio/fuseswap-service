import { Token } from '@fuseio/fuse-swap-sdk'
// import getBases from './getBases'
// import getBasePairs from './getBasePairs'

export default function getAllPairCombinations(
  tokenA: Token | undefined,
  tokenB: Token | undefined
): [Token, Token][] {
  return tokenA && tokenB
    ? [[tokenA, tokenB]]
        .filter((tokens): tokens is [Token, Token] =>
          Boolean(tokens[0] && tokens[1])
        )
        .filter(([t0, t1]) => t0.address !== t1.address)
    : []
}
