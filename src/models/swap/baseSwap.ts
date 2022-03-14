import { Contract, PopulatedTransaction } from '@ethersproject/contracts'
import { Currency, CurrencyAmount } from '@voltage-finance/sdk'

export default abstract class BaseSwap {
    protected readonly currencyIn: Currency
    protected readonly currencyOut: Currency
    protected readonly amountIn: CurrencyAmount
    protected readonly recipient?: string

    protected readonly swapContractName?: string

    constructor (
      currencyIn: Currency,
      currencyOut: Currency,
      amountIn: CurrencyAmount,
      recipient?: string
    ) {
      this.currencyIn = currencyIn
      this.currencyOut = currencyOut
      this.amountIn = amountIn
      this.recipient = recipient
    }

    abstract getSwapContract(): Contract

    abstract getSwapContractName(): string

    abstract getSwapContractAddress(): string

    abstract getParams(): any

    abstract getUnsignedTransaction(): Promise<PopulatedTransaction|undefined>

    abstract getTrade(): any
}
