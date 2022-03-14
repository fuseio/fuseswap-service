import tokenList from '@voltage-finance/swap-default-token-list'
import { ChainId } from '@voltage-finance/sdk'
import listToTokenMap from '../../../../src/utils/token/listToTokenMap'
import getTokens from '../../../../src/utils/token/getTokens'

describe('getTokens', () => {
  test('should return fuse list', () => {
    expect(getTokens()).toEqual(listToTokenMap(tokenList)[ChainId.FUSE])
  })
})
