import { ZERO_ADDRESS } from '@constants/index'

export default function isZeroAddress (address: string): boolean {
  return address === ZERO_ADDRESS
}
