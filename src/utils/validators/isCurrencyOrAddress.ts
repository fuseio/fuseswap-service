import { ETHER as FUSE } from '@fuseio/fuse-swap-sdk'
import isEthereumAddress from '@utils/isEthereumAddress'

export default function (value: string): boolean {
  if (!isEthereumAddress(value) && value !== FUSE.symbol) {
    throw new Error('Address is not valid')
  }

  return true
}
