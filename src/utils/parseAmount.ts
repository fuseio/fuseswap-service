import {
  Currency,
  TokenAmount,
  JSBI,
  CurrencyAmount,
  Token
} from '@fuseio/fuse-swap-sdk'
import { parseUnits } from '@ethersproject/units'

export default function parseAmount (
  value: string,
  currency?: Currency
): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined
  }

  try {
    const parsedValue = parseUnits(value, currency.decimals).toString()
    if (parsedValue !== '0') {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(parsedValue))
        : CurrencyAmount.ether(JSBI.BigInt(parsedValue))
    }
  } catch (error) {
    console.debug(`Failed to parse input amount: "${value}"`)
  }
}
