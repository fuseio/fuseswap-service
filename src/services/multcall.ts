import { Service } from 'typedi'
import ContractService from './contract'
import { MULTICALL_ADDRESS } from '../constants'
import ProviderService from './provider'
import { Interface } from '@ethersproject/abi'

@Service()
export default class MulticallService {
  constructor(private contractService: ContractService) {}

  async call(
    addresses: (string | undefined)[],
    ABI: any,
    methodName: string
  ): Promise<any> {
    const contractInterface = new Interface(ABI)
    const fragment = contractInterface.getFunction(methodName)
    const callData = fragment && contractInterface.encodeFunctionData(fragment)
    const calls =
      fragment && addresses && addresses.length > 0
        ? addresses.map((address) => {
            return address && callData
              ? {
                  address,
                  callData,
                }
              : undefined
          })
        : []

    const multiCallContract = this.contractService.getMulticallContract(
      MULTICALL_ADDRESS,
      ProviderService.getProvider()
    )

    const [, results] = await multiCallContract.aggregate(
      calls.map((obj) => [obj?.address, obj?.callData])
    )

    return results.map((result: any) => {
      if (result !== '0x') {
        return contractInterface.decodeFunctionResult(fragment, result)
      }

      return undefined
    })
  }
}
