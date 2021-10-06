import { ETHER, CurrencyAmount } from '@fuseio/fuse-swap-sdk'
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
    const parsedAmount = parseAmount('9.1234567', USDC)
    expect(parsedAmount?.raw.toString()).toBe('9123456')
  })
})
