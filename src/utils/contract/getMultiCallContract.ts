import { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import MULTICALL_ABI from '../../constants/abis/multicall.json'
import getContract from './getContract'

export default function getMultiCallContract(
  address: string,
  provider: Provider
): Contract {
  return getContract(address, MULTICALL_ABI, provider)
}
