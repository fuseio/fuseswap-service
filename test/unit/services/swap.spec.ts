import { ETHER as FUSE, Trade } from '@fuseio/fuse-swap-sdk'
import SwapService from '../../../src/services/swap'
import { DAI, WETH } from '../../../src/constants'

describe('SwapService', () => {
  const recipient = '0x5670d7076E7b3604ceb07c003ff0920490756587'
  const slippage = 50
  let deadline: number

  beforeEach(() => {
    deadline = Math.floor(Date.now() / 1000) + 60 * 20
  })

  describe('#getBestTradeExactIn', () => {
    test('given two tokens should return trade', async () => {
      const trade = await SwapService.getBestTradeExactIn(
        DAI.address,
        WETH.address,
        '1'
      )

      expect(trade).toBeInstanceOf(Trade)
      expect(trade.route.input.symbol).toEqual(DAI.symbol)
      expect(trade.route.output.symbol).toEqual(WETH.symbol)
    })

    test('given fuse and token should return trade', async () => {
      const trade = await SwapService.getBestTradeExactIn(
        DAI.address,
        FUSE.symbol ?? 'FUSE',
        '1'
      )

      expect(trade).toBeInstanceOf(Trade)
      expect(trade.route.input.symbol).toEqual(DAI.symbol)
      expect(trade.route.output.symbol).toEqual(FUSE.symbol)
    })
  })

  describe('#swapCallParameters', () => {
    test('returns parameters for tokens to tokens trade', async () => {
      const swapParameters = await SwapService.getSwapCallParameters(
        DAI.address,
        WETH.address,
        '1',
        recipient,
        slippage,
        deadline
      )

      const { methodName, args } = swapParameters
      const [amountIn, , , to] = args

      expect(methodName).toEqual('swapExactTokensForTokens')
      expect(amountIn).toBe('0xde0b6b3a7640000')
      expect(to).toBe(recipient)
    })

    test('returns parameters for tokens to fuse trade', async () => {
      const swapParameters = await SwapService.getSwapCallParameters(
        DAI.address,
        FUSE.symbol ?? 'FUSE',
        '1',
        recipient,
        slippage,
        deadline
      )

      expect(swapParameters.methodName).toEqual('swapExactTokensForETH')
    })

    test('returns paramters for fuse to tokens trade', async () => {
      const swapParameters = await SwapService.getSwapCallParameters(
        FUSE.symbol ?? 'FUSE',
        WETH.address,
        '1',
        recipient,
        slippage,
        deadline
      )

      const { methodName, args, value } = swapParameters
      const [, , to] = args

      expect(methodName).toEqual('swapExactETHForTokens')
      expect(value).toBe('0xde0b6b3a7640000')
      expect(to).toBe(recipient)
      expect(swapParameters.methodName).toEqual('swapExactETHForTokens')
    })
  })
})
