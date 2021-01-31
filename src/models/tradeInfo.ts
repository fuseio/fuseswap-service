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

  constructor (trade: Trade) {
    this.inputAmount = trade.inputAmount.toSignificant()
    this.outputAmount = trade.outputAmount.toSignificant()
    this.route = trade.route.path.map(token => token.symbol)
    this.inputToken = trade.route.input.symbol
    this.outputToken = trade.route.output.symbol
    this.executionPrice = trade.executionPrice.toSignificant()
    this.nextMidPrice = trade.nextMidPrice.toSignificant()
    this.priceImpact = trade.priceImpact.toSignificant()
  }

  static fromTrade (trade: Trade) {
    return new TradeInfo(trade)
  }
}
