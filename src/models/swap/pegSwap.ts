import { Contract } from '@ethersproject/contracts'
import getContract from '@utils/getContract'
import { PEGSWAP_ADDRESS } from '@constants/index'
import PEGSWAP_ABI from '@constants/abis/pegSwap.json'
import Provider from '@services/provider'
import BaseSwap from './baseSwap'
import { Token } from '@voltage-finance/sdk'
import toHex from '@utils/toHex'
import TradeInfo from '@models/tradeInfo'
import { formatUnits } from '@ethersproject/units'

export default class PegSwap extends BaseSwap {
  swapContractName = 'PegSwap'

  getSwapContract (): Contract {
    return getContract(this.getSwapContractAddress(), PEGSWAP_ABI, Provider.getProvider())
  }

  getSwapContractName (): string {
    return this.swapContractName
  }

  getSwapContractAddress (): string {
    return PEGSWAP_ADDRESS
  }

  getParams () {
    if (!(this.currencyIn instanceof Token) || !(this.currencyOut instanceof Token)) {
      throw new Error('Expected instance of Token')
    }

    const methodName = 'swap'

    const amount = toHex(this.amountIn)
    const currencyInAddress = this.currencyIn?.address
    const currencyOutAddress = this.currencyOut?.address

    const args = [amount, currencyInAddress, currencyOutAddress]
    const value = '0x0'

    return { methodName, args, value }
  }

  async getUnsignedTransaction () {
    const { methodName, args } = this.getParams()

    const contract = this.getSwapContract()
    const txn = await contract.populateTransaction[methodName](...args)

    return txn
  }

  get formattedAmountIn () {
    return formatUnits(this.amountIn.raw.toString(), this.currencyIn.decimals)
  }

  async getSwappableAmount () {
    if (!(this.currencyIn instanceof Token) || !(this.currencyOut instanceof Token)) {
      throw new Error('Expected instance of Token')
    }

    const contract = this.getSwapContract()

    const amount = await contract.getSwappableAmount(this.currencyIn.address, this.currencyOut.address)
    return formatUnits(amount, this.currencyOut.decimals)
  }

  async getTrade () {
    const maxAmount = await this.getSwappableAmount()
    if (Number(this.formattedAmountIn) > Number(maxAmount)) {
      return
    }

    return {
      info: new TradeInfo(
        this.formattedAmountIn,
        this.formattedAmountIn,
        [this.currencyIn.symbol, this.currencyOut.symbol],
        this.currencyIn.symbol,
        this.currencyOut.symbol,
        this.formattedAmountIn,
        this.formattedAmountIn,
        '0'
      ),
      // empty object for compatibility
      trade: {}
    }
  }
}
