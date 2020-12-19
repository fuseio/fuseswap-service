import getBases from '../../../src/utils/getBases'
import { BASES_TO_CHECK_TRADES_AGAINST, CHAIN_ID } from '../../../src/constants'

describe('#getBases', () => {
  test('returns trade bases', () => {
    expect(getBases()).toEqual(BASES_TO_CHECK_TRADES_AGAINST[CHAIN_ID])
  })
})
