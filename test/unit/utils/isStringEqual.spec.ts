import isStringEqual from '../../../src/utils/isStringEqual'

describe('isStringEqual', () => {
  test('should return true if two similar strings of case are provided', () => {
    expect(isStringEqual('a', 'a')).toBeTruthy()
  })

  test('should return true if two similar strings of different case are provided', () => {
    expect(isStringEqual('A', 'a')).toBeTruthy()
    
    expect(
      isStringEqual(
        '0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA', 
        '0x94ba7a27c7a95863d1bdc7645ac2951e0cca06ba'
      )
    ).toBeTruthy()

    expect(
      isStringEqual(
        '0x94ba7a27c7a95863d1bdc7645ac2951e0cca06ba',
        '0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA' 
      )
    ).toBeTruthy()

    expect(isStringEqual('Fuse', 'fuse')).toBeTruthy()
  })
})
