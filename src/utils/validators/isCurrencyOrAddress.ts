import { isAddress } from '@ethersproject/address'
import { ETHER as FUSE } from '@fuseio/fuse-swap-sdk'

export default function (value: string): boolean {
  if (!isAddress(value) && value !== FUSE.symbol) {
    throw new Error('Address is not valid')
  }

  return true
}
