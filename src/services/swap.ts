import {
  Percent,
  Trade,
  Router,
  SwapParameters,
  JSBI
} from '@fuseio/fuse-swap-sdk'
import { Service } from 'typedi'
import parseAmount from '@utils/parseAmount'
import {
  INITIAL_ALLOWED_SLIPPAGE,
  BIPS_BASE,
  DEFAULT_DEADLINE_FROM_NOW,
  ROUTER_ADDRESS
} from '@constants/index'
import TokenService from './token'
import PairService from './pair'
import ContractService from './contract'
import ProviderService from './provider'
import RequestError from '@models/requestError'

@Service()
export default class SwapService {
  constructor (
    private tokenService: TokenService,
    private pairService: PairService,
    private contractService: ContractService
  ) {}

  async getBestTradeExactIn (
    currencyInAddress: string,
    currencyOutAddress: string,
    amountIn: string
  ): Promise<Trade> {
    const currencyIn = await this.tokenService.getToken(currencyInAddress)
    const currencyOut = await this.tokenService.getToken(currencyOutAddress)

    if (!currencyIn || !currencyOut) { throw new RequestError(400, 'Failed to get Token') }

    const parsedAmount = parseAmount(amountIn, currencyIn)

    if (!parsedAmount) { throw new RequestError(400, `Failed to parse amount: ${amountIn}`) }

    const pairs = await this.pairService.getPairs(currencyIn, currencyOut)

    return Trade.bestTradeExactIn(pairs, parsedAmount, currencyOut, {
      maxHops: 3,
      maxNumResults: 1
    })[0]
  }

  async getSwapCallParameters (
    currencyInAddress: string,
    currencyOutAddress: string,
    amountIn: string,
    recipient: string,
    slippageTolerance = INITIAL_ALLOWED_SLIPPAGE,
    deadline = DEFAULT_DEADLINE_FROM_NOW
  ): Promise<any> {
    const trade = await this.getBestTradeExactIn(
      currencyInAddress,
      currencyOutAddress,
      amountIn
    )

    if (!trade) return undefined

    const swapCallParameters = Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: new Percent(JSBI.BigInt(slippageTolerance), BIPS_BASE),
      recipient: recipient,
      ttl: deadline
    })

    const rawParameters = await this.getRawSwapParameters(
      swapCallParameters
    )

    return {
      ...swapCallParameters,
      rawTxn: rawParameters
    }
  }

  async getRawSwapParameters (swapParameters: SwapParameters) {
    const { methodName, args, value } = swapParameters

    const router = this.contractService.getRouterV2Contract(
      ROUTER_ADDRESS,
      ProviderService.getProvider()
    )

    const rawTxn = await router.populateTransaction[methodName](...args, {
      value
    })

    return rawTxn
  }
}
