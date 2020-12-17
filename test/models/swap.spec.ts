import {
  TokenAmount,
  Percent,
  ETHER as FUSE,
  Trade,
  CurrencyAmount,
  WETH,
} from '@fuseio/fuse-swap-sdk'
import Swap from '../../src/models/swap'
import { DAI, CHAIN_ID } from '../../src/constants'

// TODO: Add more assertations under each test

describe('Swap', () => {
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
        WETH[CHAIN_ID],
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

  describe('#swapCallParameters', () => {
    let deadline: number

    beforeEach(() => {
      deadline = Math.floor(Date.now() / 1000) + 60 * 20
    })

    test('returns parameters for tokens to tokens trade', async () => {
      const swap = new Swap(
        DAI,
        WETH[CHAIN_ID],
        new TokenAmount(DAI, '1'),
        slippage,
        deadline,
        recipient
      )

      const params = await swap.getSwapCallParameters()

      expect(params.methodName).toEqual('swapExactTokensForTokens')
    })

    test('returns parameters for tokens to fuse trade', async () => {
      const swap = new Swap(
        DAI,
        FUSE,
        new TokenAmount(DAI, '1'),
        slippage,
        deadline,
        recipient
      )

      const params = await swap.getSwapCallParameters()

      expect(params.methodName).toEqual('swapExactTokensForETH')
    })

    test('returns paramters for fuse to tokens trade', async () => {
      const swap = new Swap(
        FUSE,
        DAI,
        CurrencyAmount.ether('1'),
        slippage,
        deadline,
        recipient
      )

      const params = await swap.getSwapCallParameters()

      expect(params.methodName).toEqual('swapExactETHForTokens')
    })
  })
})
