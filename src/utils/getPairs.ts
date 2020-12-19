import { Currency, Pair, TokenAmount } from '@fuseio/fuse-swap-sdk'
import wrapCurrency from './wrapCurrency'
import { CHAIN_ID } from '../constants'
import getAllPairCombinations from './getAllPairCombinations'
import getPairReserves from './getPairReserves'
import uniqBy from 'lodash.uniqby'

export default async function getPairs(
  inputToken: Currency,
  outputToken: Currency
): Promise<any> {
  const [tokenA, tokenB] = [
    wrapCurrency(inputToken, CHAIN_ID),
    wrapCurrency(outputToken, CHAIN_ID),
  ]

  const tokens = getAllPairCombinations(
    tokenA,
    tokenB
  ).map(([tokenA, tokenB]) => [
    wrapCurrency(tokenA, CHAIN_ID),
    wrapCurrency(tokenB, CHAIN_ID),
  ])

  const pairReserves = await getPairReserves(tokens)

  // TODO: Refactor this
  return uniqBy(
    pairReserves
      .map((result: any, i: any) => {
        const reserves = result

        const tokenA = tokens[i][0]
        const tokenB = tokens[i][1]

        if (!tokenA || !tokenB || tokenA.equals(tokenB)) return undefined

        if (!reserves) return undefined

        const { reserve0, reserve1 } = reserves

        const [token0, token1] = tokenA.sortsBefore(tokenB)
          ? [tokenA, tokenB]
          : [tokenB, tokenA]

        return new Pair(
          new TokenAmount(token0, reserve0.toString()),
          new TokenAmount(token1, reserve1.toString())
        )
      })
      .filter((x: any): x is Pair => Boolean(x)),
    'liquidityToken.address'
  )
}
