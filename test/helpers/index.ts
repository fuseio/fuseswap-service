import { Pair, TokenAmount, Token } from '@voltage-finance/sdk'

export function generatePair(tokenA: Token, tokenB: Token) {
  return new Pair(
    new TokenAmount(tokenA, '60000000000000000000'),
    new TokenAmount(tokenB, '70000000000000000000')
  )
}
