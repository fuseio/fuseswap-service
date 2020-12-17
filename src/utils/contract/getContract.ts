import { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { isAddress } from '@ethersproject/address'

export default function getContract(
  address: string,
  ABI: any,
  provider: Provider
): Contract {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, provider)
}
