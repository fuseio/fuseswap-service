import { Provider } from '@ethersproject/abstract-provider'
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'

export default function getContract (address: string, ABI: any, provider: Provider): Contract {
  if (!isAddress(address)) {
    throw new Error(`Invalid 'address' parameter '${address}'`)
  }
  return new Contract(address, ABI, provider)
}
