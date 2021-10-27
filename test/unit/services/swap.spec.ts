import { ETHER as FUSE, Trade, Pair, TokenAmount } from '@fuseio/fuse-swap-sdk'
import sinon from 'sinon'
import SwapService from '../../../src/services/swap'
import { DAI, FUSD, NATIVE_ADDRESS, USDC, WETH, WFUSE, WFUSE_ADDRESSS } from '../../../src/constants'
import TokenService from '../../../src/services/token'
import PairService from '../../../src/services/pair'
import ContractService from '../../../src/services/contract'
import { generatePair } from '../../helpers'
import MulticallService from '../../../src/services/multcall'
import FuseswapGraphService from '../../../src/services/fuseswapGraph'
import BlockGraphService from '../../../src/services/blockGraph'

describe('SwapService', () => {
  let tokenService: TokenService
  let pairService: PairService
  let contractService: ContractService

  let deadline: number

  const recipient = '0x5670d7076E7b3604ceb07c003ff0920490756587'
  const slippage = 50
  const FUSE_SYMBOL = 'FUSE'

  beforeEach(() => {
    deadline = Math.floor(Date.now() / 1000) + 60 * 20
    contractService = new ContractService()

    const multicallService = new MulticallService(contractService)
    const fuseswapGraphService = new FuseswapGraphService()
    const blockGraphService = new BlockGraphService()

    tokenService = new TokenService(contractService, fuseswapGraphService, blockGraphService)
    pairService = new PairService(multicallService)
  })

  describe('#getBestTradeExactIn', () => {
    test('given two tokens should return trade', async () => {
      sinon
        .stub(tokenService, 'getToken')
        .withArgs(DAI.address)
        .resolves(DAI)
        .withArgs(WETH.address)
        .resolves(WETH)

      sinon.stub(pairService, 'getPairs').resolves([generatePair(DAI, WETH)])
      const swapService = new SwapService(
        tokenService,
        pairService
      )

      const trade = await swapService.getBestTradeExactIn(
        DAI.address,
        WETH.address,
        '1'
      )

      expect(trade).toBeInstanceOf(Trade)
      expect(trade?.route.input.symbol).toEqual(DAI.symbol)
      expect(trade?.route.output.symbol).toEqual(WETH.symbol)
    })

    test('given fuse and token should return trade', async () => {
      sinon
        .stub(tokenService, 'getToken')
        .withArgs(DAI.address)
        .resolves(DAI)
        .withArgs(FUSE_SYMBOL)
        .resolves(FUSE)

      sinon.stub(pairService, 'getPairs').resolves([generatePair(DAI, WFUSE)])

      const swapService = new SwapService(
        tokenService,
        pairService,
      )
      const trade = await swapService.getBestTradeExactIn(
        DAI.address,
        FUSE_SYMBOL,
        '1'
      )

      expect(trade).toBeInstanceOf(Trade)
      expect(trade?.route.input.symbol).toEqual(DAI.symbol)
      expect(trade?.route.output.symbol).toEqual(FUSE.symbol)
    })
  })

  describe('#getSwapCallData', () => {
    describe('fuseSwap', () => {
      test('returns parameters for tokens to tokens trade', async () => {
        sinon
          .stub(tokenService, 'getToken')
          .withArgs(DAI.address)
          .resolves(DAI)
          .withArgs(WETH.address)
          .resolves(WETH)
  
        sinon.stub(pairService, 'getPairs').resolves([generatePair(DAI, WETH)])
  
        const swapService = new SwapService(
          tokenService,
          pairService
        )
        const swapParameters = await swapService.getSwapCallData(
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
        sinon
          .stub(tokenService, 'getToken')
          .withArgs(DAI.address)
          .resolves(DAI)
          .withArgs(FUSE_SYMBOL)
          .resolves(FUSE)
  
        sinon.stub(pairService, 'getPairs').resolves([generatePair(DAI, WFUSE)])
  
        const swapService = new SwapService(
          tokenService,
          pairService
        )
        const swapParameters = await swapService.getSwapCallData(
          DAI.address,
          FUSE_SYMBOL,
          '1',
          recipient,
          slippage,
          deadline
        )
  
        expect(swapParameters.methodName).toEqual('swapExactTokensForETH')
      })
  
      test('returns paramters for fuse to tokens trade', async () => {
        sinon
          .stub(tokenService, 'getToken')
          .withArgs(FUSE_SYMBOL)
          .resolves(FUSE)
          .withArgs(WETH.address)
          .resolves(WETH)
  
        sinon
          .stub(pairService, 'getPairs')
          .resolves([
            new Pair(
              new TokenAmount(WFUSE, '60000000000000000000'),
              new TokenAmount(WETH, '70000000000000000000')
            ),
          ])
  
        const swapService = new SwapService(
          tokenService,
          pairService
        )
        const swapParameters = await swapService.getSwapCallData(
          FUSE_SYMBOL,
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
      })
    })

    describe('pegSwap', () => {
      test('returns swapCallData for fusd', async () => {
        const swapService = new SwapService(
          tokenService,
          pairService
        )

        const data = await swapService.getSwapCallData(
          FUSD.address,
          USDC.address,
          '1',
          recipient,
          slippage,
          deadline
        )

        const { methodName, args } = data
        const [amount] = args

        expect(methodName).toEqual('swap')
        expect(amount).toBe('0xde0b6b3a7640000')  
      })

      test('returns swapCallData for usdc', async () => {
        const swapService = new SwapService(
          tokenService,
          pairService
        )

        const data = await swapService.getSwapCallData(
          USDC.address,
          FUSD.address,
          '1',
          recipient,
          slippage,
          deadline
        )

        const { methodName, args } = data
        const [amount] = args

        expect(methodName).toEqual('swap')
        expect(amount).toBe('0xf4240')  
      })
    })
  })

  describe('wrap', () => {
    test('returns swapData for fuse to wfuse', async () => {
      const swapService = new SwapService(
        tokenService,
        pairService
      )

      const data = await swapService.getSwapCallData(
        NATIVE_ADDRESS,
        WFUSE_ADDRESSS,
        '1',
        recipient
      )

      const { methodName, value} = data

      expect(methodName).toEqual('deposit')
      expect(value).toBe('0xde0b6b3a7640000')
    })

    test('returns swapData for wfuse to fuse', async () => {
      const swapService = new SwapService(
        tokenService,
        pairService
      )

      const data = await swapService.getSwapCallData(
        WFUSE_ADDRESSS,
        NATIVE_ADDRESS,
        '1',
        recipient
      )

      const { methodName, args } = data
      const [ amount ] = args

      expect(methodName).toEqual('withdraw')
      expect(amount).toBe('0xde0b6b3a7640000')
    })
  })
})
