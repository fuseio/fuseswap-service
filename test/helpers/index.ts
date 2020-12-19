import { Pair, TokenAmount, Token } from '@fuseio/fuse-swap-sdk'

export function generatePair(tokenA: Token, tokenB: Token) {
  return new Pair(
    new TokenAmount(tokenA, '60000000000000000000'),
    new TokenAmount(tokenB, '70000000000000000000')
  )
}
