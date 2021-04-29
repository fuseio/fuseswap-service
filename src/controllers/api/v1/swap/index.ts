/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import SwapService from '@services/swap'
import { SWAP_FAILED_CREATE_TRADE, SWAP_FAILED_NO_LIQUIDITY } from '@constants/text'

export default {
  async swapCallParameters (req: Request, res: Response, next: NextFunction) {
    const {
      currencyIn,
      currencyOut,
      amountIn,
      allowedSlippage,
      ttl,
      recipient
    } = req.body

    try {
      const swapService = Container.get(SwapService)

      const swapCallData = await swapService.getSwapCallData(
        currencyIn,
        currencyOut,
        amountIn,
        recipient,
        allowedSlippage,
        ttl
      )

      if (!swapCallData) {
        res.status(200).json({ message: SWAP_FAILED_NO_LIQUIDITY })
        return
      }

      res.send(swapCallData)
    } catch (e) {
      next(e)
    }
  },

  async trade (req: Request, res: Response, next: NextFunction) {
    const { currencyIn, currencyOut, amountIn } = req.body
    try {
      const swapService = Container.get(SwapService)

      const trade = await swapService.getTrade(
        currencyIn,
        currencyOut,
        amountIn
      )

      let data

      if (trade) {
        data = trade
      } else {
        data = { error: SWAP_FAILED_CREATE_TRADE }
      }

      res.send({ data })
    } catch (e) {
      next(e)
    }
  }
}
