import {
  Percent,
  Trade,
  Router,
  SwapParameters,
  JSBI,
} from '@fuseio/fuse-swap-sdk'
import { Service } from 'typedi'
import parseAmount from '@utils/parseAmount'
import {
  INITIAL_ALLOWED_SLIPPAGE,
  BIPS_BASE,
  DEFAULT_DEADLINE_FROM_NOW,
} from '@constants/index'
import TokenService from './token'
import PairService from './pair'

@Service()
export default class SwapService {
  constructor(
    private tokenService: TokenService,
    private pairService: PairService
  ) {}

  async getBestTradeExactIn(
    currencyInAddress: string,
    currencyOutAddress: string,
    amountIn: string
  ): Promise<Trade> {
    const currencyIn = await this.tokenService.getToken(currencyInAddress)
    const currencyOut = await this.tokenService.getToken(currencyOutAddress)

    if (!currencyIn || !currencyOut) throw new Error('Failed to get Token')

    const parsedAmount = parseAmount(amountIn, currencyIn)

    if (!parsedAmount) {
      throw new Error(`Failed to parse amount: ${amountIn}`)
    }

    const pairs = await this.pairService.getPairs(currencyIn, currencyOut)

    return Trade.bestTradeExactIn(pairs, parsedAmount, currencyOut, {
      maxHops: 3,
      maxNumResults: 1,
    })[0]
  }

  async getSwapCallParameters(
    currencyInAddress: string,
    currencyOutAddress: string,
    amountIn: string,
    recipient: string,
    slippageTolerance = INITIAL_ALLOWED_SLIPPAGE,
    deadline = DEFAULT_DEADLINE_FROM_NOW
  ): Promise<SwapParameters> {
    const trade = await this.getBestTradeExactIn(
      currencyInAddress,
      currencyOutAddress,
      amountIn
    )

    return Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: new Percent(JSBI.BigInt(slippageTolerance), BIPS_BASE),
      recipient: recipient,
      ttl: deadline,
    })
  }
}
