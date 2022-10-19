/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import SwapService from '@services/swap'
import { CNS_TOKEN_ADDRESS } from '@constants/index'

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
      const slippage = currencyIn.toLowerCase() === CNS_TOKEN_ADDRESS.toLowerCase()
        ? 2000
        : currencyOut.toLowerCase() === CNS_TOKEN_ADDRESS.toLowerCase()
          ? 1000
          : allowedSlippage
      const swapCallData = await swapService.getSwapCallData(
        currencyIn,
        currencyOut,
        amountIn,
        recipient,
        slippage,
        ttl
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
