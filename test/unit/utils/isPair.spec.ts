import { isFusdUsdcPair } from '../../../src/utils/isPair'
import { USDC, USDT, FUSD } from '../../../src/constants/index'

describe('isFusdUsdcPair', () => {
    test('should return true when direct pair is provided', () => {
        expect(isFusdUsdcPair(FUSD.address, USDC.address)).toBeTruthy()
    })

    test('should return true when inverse pair is provided', () => {
        expect(isFusdUsdcPair(USDC.address, FUSD.address)).toBeTruthy()
    })

    test('should return false for incorrect values', () => {
        expect(isFusdUsdcPair('', '')).toBeFalsy()
        expect(isFusdUsdcPair(FUSD.address, '')).toBeFalsy()
        expect(isFusdUsdcPair('', USDC.address)).toBeFalsy()
        expect(isFusdUsdcPair(FUSD.address, USDT.address)).toBeFalsy()
    })
})