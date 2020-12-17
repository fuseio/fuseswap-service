import basePairs from '../constants/basePair.json'
import getBasePairs from '../../src/utils/getBasePairs'

describe('#getBasePairs', () => {
  test('returns base pairs', () => {
    expect(getBasePairs()).toEqual(basePairs)
  })
})
