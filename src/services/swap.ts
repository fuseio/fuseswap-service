import {
  Percent,
  Trade,
  Router,
  SwapParameters,
  JSBI,
} from '@fuseio/fuse-swap-sdk'
import getPairs from '../utils/getPairs'
import getToken from '../utils/token/getToken'
import parseAmount from '../utils/parseAmount'
import {
  INITIAL_ALLOWED_SLIPPAGE,
  BIPS_BASE,
  DEFAULT_DEADLINE_FROM_NOW,
} from '../constants'

export default class SwapService {
  static async getBestTradeExactIn(
    inputCurrencyAddress: string,
    outputCurrencyAddress: string,
    inputAmountIn: string
  ): Promise<Trade> {
    const inputCurrency = await getToken(inputCurrencyAddress)
    const outputCurrency = await getToken(outputCurrencyAddress)
    if (!inputCurrency || !outputCurrency)
      throw new Error('Failed to get Token')

    const parsedAmount = parseAmount(inputAmountIn, inputCurrency)
    if (!parsedAmount) {
      throw new Error(`Failed to parse amount: ${inputAmountIn}`)
    }

    const pairs = await getPairs(inputCurrency, outputCurrency)

    return Trade.bestTradeExactIn(pairs, parsedAmount, outputCurrency, {
      maxHops: 3,
      maxNumResults: 1,
    })[0]
  }

  static async getSwapCallParameters(
    inputCurrencyAddress: string,
    outputCurrencyAddress: string,
    inputAmountIn: string,
    recipient: string,
    slippageTolerance = INITIAL_ALLOWED_SLIPPAGE,
    deadline = DEFAULT_DEADLINE_FROM_NOW
  ): Promise<SwapParameters> {
    const trade = await this.getBestTradeExactIn(
      inputCurrencyAddress,
      outputCurrencyAddress,
      inputAmountIn
    )

    return Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: new Percent(JSBI.BigInt(slippageTolerance), BIPS_BASE),
      recipient: recipient,
      ttl: deadline,
    })
  }
}
