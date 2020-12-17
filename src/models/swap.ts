import { Currency, CurrencyAmount, Percent, Trade } from '@fuseio/fuse-swap-sdk'
import getPairs from '../utils/getPairs'

export default class Swap {
  readonly inputCurrency: Currency
  readonly outputCurrency: Currency
  readonly inputAmountIn: CurrencyAmount
  readonly slippageTolerance: Percent
  readonly deadline: number
  readonly recipient: string

  constructor(
    inputCurrency: Currency,
    outputCurrency: Currency,
    inputAmountIn: CurrencyAmount,
    slippageTolerance: Percent,
    deadline: number,
    recipient: string
  ) {
    this.inputCurrency = inputCurrency
    this.outputCurrency = outputCurrency
    this.inputAmountIn = inputAmountIn
    this.slippageTolerance = slippageTolerance
    this.deadline = deadline
    this.recipient = recipient
  }

  async getBestTradeExactIn(): Promise<Trade> {
    const pairs = await getPairs(this.inputCurrency, this.outputCurrency)

    return Trade.bestTradeExactIn(
      pairs,
      this.inputAmountIn,
      this.outputCurrency,
      { maxHops: 3, maxNumResults: 1 }
    )[0]
  }
}
