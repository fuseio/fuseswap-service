import { Service } from 'typedi'
import parseAmount from '@utils/parseAmount'
import {
  INITIAL_ALLOWED_SLIPPAGE,
  DEFAULT_DEADLINE_FROM_NOW
} from '@constants/index'
import TokenService from './token'
import PairService from './pair'
import { isFusdUsdcPair } from '@utils/isPair'
import BaseSwap from '@models/swap/baseSwap'
import PegSwap from '@models/swap/pegSwap'
import BasicSwap from '@models/swap/basicSwap'
import { Trade } from '@fuseio/fuse-swap-sdk'

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

    if (!currencyIn || !currencyOut || !parsedAmount || !pairs) return

    let swap: BaseSwap
    const swapType = this.getSwapType(currencyInAddress, currencyOutAddress)

    switch (swapType) {
      case SwapType.PEG_SWAP:
        swap = new PegSwap(currencyIn, currencyOut, parsedAmount, recipient)
        break
      case SwapType.BASIC_SWAP:
        swap = new BasicSwap(
          currencyIn,
          currencyOut,
          parsedAmount,
          recipient,
          slippageTolerance,
          deadline,
          pairs
        )
        break
      default:
        return
    }

    const address = swap.getSwapContractAddress()
    const contractName = swap.getSwapContractName()
    const params = swap.getParams()
    const rawTxn = await swap.getUnsignedTransaction()

    if (!params || !rawTxn) return

    return {
      address,
      contractName,
      ...params,
      rawTxn
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
