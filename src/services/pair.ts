import { Currency, Pair, TokenAmount, Token } from '@voltage-finance/sdk'
import wrapCurrency from '@utils/wrapCurrency'
import { CHAIN_ID, BASES_TO_CHECK_TRADES_AGAINST } from '@constants/index'
import { Service } from 'typedi'
import { flatMap, uniqBy, compact } from 'lodash'
import { abi as IUniswapV2PairABI } from '@constants/abis/IUniswapV2Pair.json'
import MulticallService from './multcall'

@Service()
export default class PairService {
  constructor (private multicallService: MulticallService) {}

  getBases (): Token[] {
    return BASES_TO_CHECK_TRADES_AGAINST[CHAIN_ID]
  }

  getBasePairs (): [Token, Token][] {
    return flatMap(this.getBases(), (base): [Token, Token][] =>
      this.getBases().map((otherBase) => [base, otherBase])
    ).filter(([t0, t1]) => t0.address !== t1.address)
  }

  getPairAddresses (tokens: (Token | undefined)[][]): (string | undefined)[] {
    return tokens.map(([tokenA, tokenB]) => {
      return tokenA && tokenB && !tokenA.equals(tokenB)
        ? Pair.getAddress(tokenA, tokenB)
        : undefined
    })
  }

  getPairCombinations (
    tokenA: Token | undefined,
    tokenB: Token | undefined
  ): [Token, Token][] {
    return tokenA && tokenB
      ? [
          [tokenA, tokenB],

          ...this.getBases().map((base): [Token, Token] => [tokenA, base]),

          ...this.getBases().map((base): [Token, Token] => [tokenB, base]),

          ...this.getBasePairs()
        ]
          .filter((tokens): tokens is [Token, Token] =>
            Boolean(tokens[0] && tokens[1])
          )
          .filter(([t0, t1]) => t0.address !== t1.address)
      : []
  }

  async getPairReserves (tokens: (Token | undefined)[][]): Promise<any> {
    const reserves = await this.multicallService.call(
      this.getPairAddresses(tokens),
      IUniswapV2PairABI,
      'getReserves'
    )
    return reserves
  }

  getPairsWithReserves (
    tokens: (Token | undefined)[][],
    pairReserves: any[]
  ): any {
    return pairReserves.map((result: any, i: any) => {
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
  }

  async getPairs (currencyIn?: Currency, currencyOut?: Currency): Promise<any> {
    if (!currencyIn || !currencyOut) return

    const [tokenA, tokenB] = [
      wrapCurrency(currencyIn, CHAIN_ID),
      wrapCurrency(currencyOut, CHAIN_ID)
    ]

    const tokens = this.getPairCombinations(
      tokenA,
      tokenB
    ).map(([tokenA, tokenB]) => [
      wrapCurrency(tokenA, CHAIN_ID),
      wrapCurrency(tokenB, CHAIN_ID)
    ])

    const pairReserves = await this.getPairReserves(tokens)
    const pairsWithReserves = this.getPairsWithReserves(tokens, pairReserves)

    return uniqBy(compact(pairsWithReserves), 'liquidityToken.address')
  }
}
