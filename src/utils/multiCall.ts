import { Interface } from '@ethersproject/abi'
import getMultiCallContract from './contract/getMultiCallContract'
import ProviderService from '../services/provider'
import { MULTICALL_ADDRESS } from '../constants'

export default async function multiCall(
  addresses: (string | undefined)[],
  contractInterface: Interface,
  methodName: string
): Promise<any> {
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

  const multiCallContract = getMultiCallContract(
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
