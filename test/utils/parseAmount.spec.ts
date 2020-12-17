import { ETHER, CurrencyAmount } from '@fuseio/fuse-swap-sdk'
import parseAmount from '../../src/utils/parseAmount'

describe('parseAmount', () => {
  test('should return instance of CurrencyAmount', () => {
    expect(parseAmount('10', ETHER)).toBeInstanceOf(CurrencyAmount)
  })

  test('should return correct ammount', () => {
    const parsedAmount = parseAmount('10', ETHER)
    expect(parsedAmount?.raw.toString()).toBe('10000000000000000000')
  })
})
