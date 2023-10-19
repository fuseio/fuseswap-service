import { Currency, Token } from '@voltage-finance/sdk'
import { USDC, FUSD, WETH, USDCV2, WETHV2 } from '@constants/index'
import isStringEqual from './isStringEqual'

export function isFusdUsdcPair (currencyInAddress: string, currencyOutAddress: string) {
  return isPair(currencyInAddress, currencyOutAddress, USDC, FUSD)
}

export function isUsdcV2UsdcV1Pair (currencyInAddress: string, currencyOutAddress: string) {
  return isPair(currencyInAddress, currencyOutAddress, USDC, USDCV2)
}

export function isWethV2WethV1Pair (currencyInAddress: string, currencyOutAddress: string) {
  return isPair(currencyInAddress, currencyOutAddress, WETH, WETHV2)
}

export default function isPair (
  currencyInAddress: string,
  currencyOutAddress: string,
  currencyA: Currency,
  currencyB: Currency
) {
  if (!(currencyA instanceof Token) || !(currencyB instanceof Token)) return

  return (
    (isStringEqual(currencyA.address, currencyInAddress) && isStringEqual(currencyB.address, currencyOutAddress)) ||
    (isStringEqual(currencyB.address, currencyInAddress) && isStringEqual(currencyA.address, currencyOutAddress))
  )
}
