import { isAddress } from '@ethersproject/address'

export default function (value: string): boolean {
  if (!isAddress(value)) {
    throw new Error('Address is not valid')
  }

  return true
}
