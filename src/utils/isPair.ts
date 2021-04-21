import { Currency, Token } from '@fuseio/fuse-swap-sdk'
import { USDC, FUSD } from '@constants/index'

export function isFusdUsdcPair (currencyInAddress: string, currencyOutAddress: string) {
  return isPair(currencyInAddress, currencyOutAddress, USDC, FUSD)
}

export default function isPair (
  currencyInAddress: string,
  currencyOutAddress: string,
  currencyA: Currency,
  currencyB: Currency
) {
  if (!(currencyA instanceof Token) || !(currencyB instanceof Token)) return

  return (
    (currencyA.address === currencyInAddress && currencyB.address === currencyOutAddress) ||
    (currencyB.address === currencyInAddress && currencyA.address === currencyOutAddress)
  )
}
