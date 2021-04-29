import { Trade } from '@fuseio/fuse-swap-sdk'

export default class TradeInfo {
  readonly inputAmount: string
  readonly outputAmount: string
  readonly route: Array<string|undefined>
  readonly inputToken: string | undefined
  readonly outputToken: string | undefined
  readonly executionPrice: string
  readonly nextMidPrice: string
  readonly priceImpact: string

  constructor (
    inputAmount: string,
    outputAmount: string,
    route: Array<string | undefined>,
    inputToken: string | undefined,
    outputToken: string | undefined,
    executionPrice: string,
    nextMidPrice: string,
    priceImpact: string
  ) {
    this.inputAmount = inputAmount
    this.outputAmount = outputAmount
    this.route = route
    this.inputToken = inputToken
    this.outputToken = outputToken
    this.executionPrice = executionPrice
    this.nextMidPrice = nextMidPrice
    this.priceImpact = priceImpact
  }

  static fromTrade (trade: Trade) {
    return new TradeInfo(
      trade.inputAmount.toSignificant(),
      trade.outputAmount.toSignificant(),
      trade.route.path.map(token => token.symbol),
      trade.route.input.symbol,
      trade.route.output.symbol,
      trade.executionPrice.toSignificant(),
      trade.nextMidPrice.toSignificant(),
      trade.priceImpact.toSignificant()
    )
  }
}
