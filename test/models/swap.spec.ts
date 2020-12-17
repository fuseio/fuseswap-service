import {
  Token,
  TokenAmount,
  Percent,
  ETHER as FUSE,
  Trade,
} from '@fuseio/fuse-swap-sdk'
import Swap from '../../src/models/swap'

describe('Swap', () => {
  const DAI = new Token(
    122,
    '0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA',
    18,
    'DAI',
    'Dai Stablecoin on Fuse'
  )
  const WETH = new Token(
    122,
    '0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670',
    18,
    'WETH',
    'Wrapped Ether on Fuse'
  )
  const recipient = '0x5670d7076E7b3604ceb07c003ff0920490756587'
  const slippage = new Percent('50', '1000')

  describe('#getBestTradeExactIn', () => {
    let deadline: number

    beforeEach(() => {
      deadline = Math.floor(Date.now() / 1000) + 60 * 20
    })

    test('given two tokens should return trade', async () => {
      const swap = new Swap(
        DAI,
        WETH,
        new TokenAmount(DAI, '1'),
        slippage,
        deadline,
        recipient
      )

      const trade = await swap.getBestTradeExactIn()

      expect(trade).toBeInstanceOf(Trade)
      expect(trade.route.input).toEqual(DAI)
      expect(trade.route.output).toEqual(WETH)
    })

    test('given fuse and token should return trade', async () => {
      const swap = new Swap(
        DAI,
        FUSE,
        new TokenAmount(DAI, '1'),
        slippage,
        deadline,
        recipient
      )

      const trade = await swap.getBestTradeExactIn()

      expect(trade).toBeInstanceOf(Trade)
      expect(trade.route.input).toEqual(DAI)
      expect(trade.route.output).toEqual(FUSE)
    })
  })
})
