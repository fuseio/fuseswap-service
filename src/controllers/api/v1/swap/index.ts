/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import SwapService from '@services/swap'
import { FEE_TOKENS, FEE_TOKEN_SLIPPAGE } from '@constants/index'

export default {
  async requestParameters (req: Request, res: Response, next: NextFunction) {
    try {
      const {
        currencyIn,
        currencyOut,
        amountIn,
        allowedSlippage,
        ttl,
        recipient
      } = req.body
      const swapService = Container.get(SwapService)

      const isInputFeeToken = FEE_TOKENS.includes(currencyIn.toLowerCase())
      const isOutputFeeToken = FEE_TOKENS.includes(currencyOut.toLowerCase())

      const slippage = isInputFeeToken || isOutputFeeToken ? FEE_TOKEN_SLIPPAGE : allowedSlippage

      const swapCallData = await swapService.getSwapCallData(
        currencyIn,
        currencyOut,
        amountIn,
        recipient,
        slippage,
        ttl,
        isOutputFeeToken
      )

      res.send(swapCallData)
    } catch (e) {
      next(e)
    }
  },

  async quote (req: Request, res: Response, next: NextFunction) {
    try {
      const { currencyIn, currencyOut, amountIn } = req.body
      const swapService = Container.get(SwapService)

      const trade = await swapService.getTrade(
        currencyIn,
        currencyOut,
        amountIn
      )

      res.send({ data: trade })
    } catch (e) {
      next(e)
    }
  }
}
