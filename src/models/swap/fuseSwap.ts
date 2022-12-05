import { Contract } from '@ethersproject/contracts'
import Provider from '@services/provider'
import getContract from '@utils/getContract'
import { abi as ROUTERV2_ABI } from '@constants/abis/IUniswapV2Router02.json'
import BaseSwap from './baseSwap'
import { ROUTER_ADDRESS, BIPS_BASE } from '@constants/index'
import { Currency, CurrencyAmount, JSBI, Percent, Router, Trade } from '@voltage-finance/sdk'
import TradeInfo from '@models/tradeInfo'

export default class FuseSwap extends BaseSwap {
  private readonly slippageTolerance: Percent
  private readonly deadline?: number
  private readonly pairs: any
  private readonly isInputFeeToken?: boolean

  swapContractName = 'UniswapV2Router'

  constructor (
    currencyIn: Currency,
    currencyOut: Currency,
    amountIn: CurrencyAmount,
    pairs: any,
    recipient?: string,
    slippageTolerance?: number,
    deadline?: number,
    feeToken?: boolean
  ) {
    super(currencyIn, currencyOut, amountIn, recipient)
    this.slippageTolerance = new Percent(JSBI.BigInt(slippageTolerance ?? 0), BIPS_BASE)
    this.deadline = deadline
    this.pairs = pairs
    this.isInputFeeToken = feeToken
  }

  getSwapContract (): Contract {
    return getContract(this.getSwapContractAddress(), ROUTERV2_ABI, Provider.getProvider())
  }

  getSwapContractName (): string {
    return this.swapContractName
  }

  getSwapContractAddress (): string {
    return ROUTER_ADDRESS
  }

  getParams () {
    const trade = this.getTradeExactIn()
    if (!trade || !this.recipient || !this.deadline) return

    return Router.swapCallParameters(trade, {
      feeOnTransfer: this.isInputFeeToken,
      allowedSlippage: this.slippageTolerance,
      ttl: this.deadline,
      recipient: this.recipient
    })
  }

  async getUnsignedTransaction () {
    const params = this.getParams()
    if (!params) return

    const { args, methodName, value } = params

    const contract = this.getSwapContract()
    const txn = await contract.populateTransaction[methodName](...args, {
      value
    })

    return txn
  }

  async getTrade () {
    const trade = this.getTradeExactIn()
    if (!trade) return

    return {
      info: TradeInfo.fromTrade(trade),
      trade
    }
  }

  private getTradeExactIn () {
    return Trade.bestTradeExactIn(this.pairs, this.amountIn, this.currencyOut, {
      maxHops: 3,
      maxNumResults: 1
    })[0]
  }
}
