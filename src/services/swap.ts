import { Service } from 'typedi'
import parseAmount from '@utils/parseAmount'
import {
  INITIAL_ALLOWED_SLIPPAGE,
  DEFAULT_DEADLINE_FROM_NOW,
  ALLOWED_PRICE_IMPACT_HIGH
} from '@constants/index'
import TokenService from './token'
import PairService from './pair'
import { isFusdUsdcPair } from '@utils/isPair'
import BaseSwap from '@models/swap/baseSwap'
import PegSwap from '@models/swap/pegSwap'
import FuseSwap from '@models/swap/fuseSwap'
import { Trade } from '@fuseio/fuse-swap-sdk'
import calculatePriceImpact from '@utils/calculatePriceImpact'
import { NoPoolLiquidityError, HighPriceImpactError } from '@models/error'

enum SwapType {
  BASIC_SWAP = 'BASIC_SWAP',
  PEG_SWAP = 'PEG_SWAP'
}

@Service()
export default class SwapService {
  constructor (
    private tokenService: TokenService,
    private pairService: PairService
  ) {}

  async getBestTradeExactIn (
    currencyInAddress: string,
    currencyOutAddress: string,
    amountIn: string
  ): Promise<Trade | undefined> {
    const currencyIn = await this.tokenService.getToken(currencyInAddress)
    const currencyOut = await this.tokenService.getToken(currencyOutAddress)
    const parsedAmount = parseAmount(amountIn, currencyIn)

    if (!currencyIn || !currencyOut || !parsedAmount) return

    const pairs = await this.pairService.getPairs(currencyIn, currencyOut)

    return Trade.bestTradeExactIn(pairs, parsedAmount, currencyOut, {
      maxHops: 3,
      maxNumResults: 1
    })[0]
  }

  async getTrade (
    currencyInAddress: string,
    currencyOutAddress: string,
    amountIn: string
  ): Promise<any> {
    const currencyIn = await this.tokenService.getToken(currencyInAddress)
    const currencyOut = await this.tokenService.getToken(currencyOutAddress)
    const parsedAmount = parseAmount(amountIn, currencyIn)
    const pairs = await this.pairService.getPairs(currencyIn, currencyOut)

    if (!currencyIn || !currencyOut || !parsedAmount || !pairs) throw new NoPoolLiquidityError()

    let swap: BaseSwap
    const swapType = this.getSwapType(currencyInAddress, currencyOutAddress)

    switch (swapType) {
      case SwapType.PEG_SWAP:
        swap = new PegSwap(currencyIn, currencyOut, parsedAmount)
        break
      case SwapType.BASIC_SWAP:
        swap = new FuseSwap(
          currencyIn,
          currencyOut,
          parsedAmount,
          pairs
        )
        break
      default:
        return
    }

    const trade = await swap.getTrade()
    if (!trade) throw new NoPoolLiquidityError()

    if (swap instanceof FuseSwap) {
      if (!calculatePriceImpact(trade.trade)?.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
        throw new HighPriceImpactError()
      }
    }

    return trade
  }

  async getSwapCallData (
    currencyInAddress: string,
    currencyOutAddress: string,
    amountIn: string,
    recipient: string,
    slippageTolerance = INITIAL_ALLOWED_SLIPPAGE,
    deadline = DEFAULT_DEADLINE_FROM_NOW
  ) {
    const currencyIn = await this.tokenService.getToken(currencyInAddress)
    const currencyOut = await this.tokenService.getToken(currencyOutAddress)
    const parsedAmount = parseAmount(amountIn, currencyIn)
    const pairs = await this.pairService.getPairs(currencyIn, currencyOut)

    if (!currencyIn || !currencyOut || !parsedAmount || !pairs) throw new NoPoolLiquidityError()

    let swap: BaseSwap
    const swapType = this.getSwapType(currencyInAddress, currencyOutAddress)

    switch (swapType) {
      case SwapType.PEG_SWAP:
        swap = new PegSwap(currencyIn, currencyOut, parsedAmount, recipient)
        break
      case SwapType.BASIC_SWAP:
        swap = new FuseSwap(
          currencyIn,
          currencyOut,
          parsedAmount,
          pairs,
          recipient,
          slippageTolerance,
          deadline
        )
        break
      default:
        return
    }

    const address = swap.getSwapContractAddress()
    const contractName = swap.getSwapContractName()
    const params = swap.getParams()
    const rawTxn = await swap.getUnsignedTransaction()

    if (!params || !rawTxn) throw new NoPoolLiquidityError()

    return {
      address,
      contractName,
      rawTxn,
      ...params
    }
  }

  getSwapType (currencyInAddress: string, currencyOutAddress: string): SwapType {
    if (isFusdUsdcPair(currencyInAddress, currencyOutAddress)) {
      return SwapType.PEG_SWAP
    } else {
      return SwapType.BASIC_SWAP
    }
  }
}
