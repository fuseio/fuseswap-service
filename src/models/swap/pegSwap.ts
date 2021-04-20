import { Contract } from '@ethersproject/contracts'
import getContract from '@utils/getContract'
import { PEGSWAP_ADDRESS } from '@constants/index'
import PEGSWAP_ABI from '@constants/abis/pegSwap.json'
import Provider from '@services/provider'
import BaseSwap from './baseSwap'
import { Token } from '@fuseio/fuse-swap-sdk'
import toHex from '@utils/toHex'

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
}
