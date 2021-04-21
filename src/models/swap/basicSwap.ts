import { Contract } from '@ethersproject/contracts'
import Provider from '@services/provider'
import getContract from '@utils/getContract'
import { abi as ROUTERV2_ABI } from '@constants/abis/IUniswapV2Router02.json'
import BaseSwap from './baseSwap'
import { ROUTER_ADDRESS, BIPS_BASE } from '@constants/index'
import { Currency, CurrencyAmount, JSBI, Percent, Router, Trade } from '@fuseio/fuse-swap-sdk'

export default class BasicSwap extends BaseSwap {
    private readonly slippageTolerance: Percent
    private readonly deadline: number
    private readonly pairs: any

    swapContractName = 'UniswapV2Router'

    constructor (
      currencyIn: Currency,
      currencyOut: Currency,
      amountIn: CurrencyAmount,
      recipient: string,
      slippageTolerance: number,
      deadline: number,
      pairs: any
    ) {
      super(currencyIn, currencyOut, amountIn, recipient)
      this.slippageTolerance = new Percent(JSBI.BigInt(slippageTolerance), BIPS_BASE)
      this.deadline = deadline
      this.pairs = pairs
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
      const trade = this.getTrade()
      if (!trade) return

      return Router.swapCallParameters(trade, {
        feeOnTransfer: false,
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

    private getTrade () {
      return Trade.bestTradeExactIn(this.pairs, this.amountIn, this.currencyOut, {
        maxHops: 3,
        maxNumResults: 1
      })[0]
    }
}
