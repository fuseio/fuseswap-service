import { formatEther } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { WFUSE, WFUSE_ADDRESSS } from '@constants/index'
import getContract from '@utils/getContract'
import Provider from '@services/provider'
import WFUSE_ABI from '@constants/abis/wfuse.json'
import BaseSwap from './baseSwap'
import TradeInfo from '@models/tradeInfo'
import { currencyEquals, ETHER as FUSE } from '@fuseio/fuse-swap-sdk'
import toHex from '@utils/toHex'

export class Wrap extends BaseSwap {
  getSwapContract (): Contract {
    return getContract(this.getSwapContractAddress(), WFUSE_ABI, Provider.getProvider())
  }

  getSwapContractName (): string {
    return 'WFUSE'
  }

  getSwapContractAddress (): string {
    return WFUSE_ADDRESSS
  }

  getParams () {
    if (this.currencyIn === FUSE && currencyEquals(WFUSE, this.currencyOut)) {
      return {
        methodName: 'deposit',
        args: [],
        value: toHex(this.amountIn)
      }
    } else if (currencyEquals(WFUSE, this.currencyIn) && this.currencyOut === FUSE) {
      return {
        methodName: 'withdraw',
        args: [toHex(this.amountIn)],
        value: '0x0'
      }
    }
  }

  async getUnsignedTransaction (): Promise<any | undefined> {
    const params = this.getParams()
    if (!params) throw new Error(`Wrap not supported for ${this.currencyIn.symbol} -> ${this.currencyOut.symbol}`)

    const { methodName, args, value } = params

    const contract = this.getSwapContract()
    const txn = await contract.populateTransaction[methodName](...args, { value })

    return {
      ...txn,
      value: txn.value?.toHexString()
    }
  }

  getTrade () {
    const amountIn = formatEther(this.amountIn.raw.toString())
    return {
      info: new TradeInfo(
        amountIn,
        amountIn,
        [this.currencyIn.symbol, this.currencyOut.symbol],
        this.currencyIn.symbol,
        this.currencyOut.symbol,
        amountIn,
        amountIn,
        '0'
      ),
      trade: {}
    }
  }
}
