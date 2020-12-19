import { Percent, Trade, Router, SwapParameters } from '@fuseio/fuse-swap-sdk'
import getPairs from '../utils/getPairs'
import getToken from '../utils/token/getToken'
import parseAmount from '../utils/parseAmount'

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
    slippageTolerance: string,
    deadline: number
  ): Promise<SwapParameters> {
    const slippage = new Percent(slippageTolerance, '1000')
    const trade = await this.getBestTradeExactIn(
      inputCurrencyAddress,
      outputCurrencyAddress,
      inputAmountIn
    )

    return Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: slippage,
      recipient: recipient,
      ttl: deadline,
    })
  }
}
