import { Service } from 'typedi'
import { Provider } from '@ethersproject/providers'
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
import ERC20_ABI from '../constants/abis/erc20.json'
import MULTICALL_ABI from '../constants/abis/multicall.json'

@Service()
export default class ContractService {
  getContract(address: string, ABI: any, provider: Provider): Contract {
    if (!isAddress(address)) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, provider)
  }

  getTokenContract(address: string, provider: Provider): Contract {
    return this.getContract(address, ERC20_ABI, provider)
  }

  getMulticallContract(address: string, provider: Provider): Contract {
    return this.getContract(address, MULTICALL_ABI, provider)
  }
}
