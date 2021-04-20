import { CurrencyAmount } from '@fuseio/fuse-swap-sdk'

export default function toHex (amount: CurrencyAmount) {
  return `0x${amount.raw.toString(16)}`
}
