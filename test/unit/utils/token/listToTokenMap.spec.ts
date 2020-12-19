import listToTokenMap, {
  EMPTY_LIST,
} from '../../../../src/utils/token/listToTokenMap'

describe('listToTokenMap', () => {
  test('should return empty list when list not provided', () => {
    expect(listToTokenMap()).toEqual(EMPTY_LIST)
  })
})
