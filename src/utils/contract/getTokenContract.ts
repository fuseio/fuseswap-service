import { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import ERC20_ABI from '../../constants/abis/erc20.json'
import getContract from './getContract'

export default function getTokenContract(
  address: string,
  provider: Provider
): Contract {
  return getContract(address, ERC20_ABI, provider)
}
