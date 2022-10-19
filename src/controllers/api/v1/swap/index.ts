/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import SwapService from '@services/swap'

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
      const isCNSToken = currencyIn.toLowerCase() === '0xc2e299b47398963c618de5b05c6bdecd4cc64022' || currencyOut.toLowerCase() === '0xc2e299b47398963c618de5b05c6bdecd4cc64022'
      const swapCallData = await swapService.getSwapCallData(
        currencyIn,
        currencyOut,
        amountIn,
        recipient,
        isCNSToken ? 1000 : allowedSlippage,
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
