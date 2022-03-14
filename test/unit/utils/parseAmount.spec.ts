import { ETHER, CurrencyAmount } from '@voltage-finance/sdk'
import parseAmount from '../../../src/utils/parseAmount'
import { USDC } from '../../../src/constants'

describe('parseAmount', () => {
  test('should return instance of CurrencyAmount', () => {
    expect(parseAmount('10', ETHER)).toBeInstanceOf(CurrencyAmount)
  })

  test('should return correct ammount', () => {
    const parsedAmount = parseAmount('10', ETHER)
    expect(parsedAmount?.raw.toString()).toBe('10000000000000000000')
  })

  test('should handle values that contain a fractional component that exceeds decimals', () => {
    expect(parseAmount('55.034086813321221958', ETHER)?.raw.toString()).toBe('55034086813321221958')
    expect(parseAmount('0.9', USDC)?.raw.toString()).toBe('900000')
    expect(parseAmount('9', USDC)?.raw.toString()).toBe('9000000')
    expect(parseAmount('9.1234567', USDC)?.raw.toString()).toBe('9123456')
    expect(parseAmount('9.1234547', USDC)?.raw.toString()).toBe('9123454')
    expect(parseAmount('9.12345555555555', USDC)?.raw.toString()).toBe('9123455')

    expect(parseAmount('0.0000009', USDC)?.raw.toString()).toBeUndefined() // TODO: should we return 0 instead of undefined?
  })
})
