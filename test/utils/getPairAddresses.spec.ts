import { WETH } from '@fuseio/fuse-swap-sdk'
import { DAI, CHAIN_ID, USDC } from '../../src/constants'
import getPairAddresses from '../../src/utils/getPairAddresses'

describe('#getPairAddresses', () => {
  test('returns pair addresses', () => {
    const tokens = [
      [DAI, WETH[CHAIN_ID]],
      [USDC, DAI],
    ]
    expect(getPairAddresses(tokens)).toEqual([
      '0x6cF952247f270BDd28d96200D8F97eF0f8F8E090',
      '0x1756609712D08a85BA9390DB5D357F0CCf800a3C',
    ])
  })

  test('returns unique pair addresses', () => {
    const tokens = [
      [DAI, WETH[CHAIN_ID]],
      [DAI, WETH[CHAIN_ID]],
      [USDC, DAI],
    ]
    expect(getPairAddresses(tokens)).toEqual([
      '0x6cF952247f270BDd28d96200D8F97eF0f8F8E090',
      '0x1756609712D08a85BA9390DB5D357F0CCf800a3C',
    ])
  })
})
