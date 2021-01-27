/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import { validationResult } from 'express-validator'
import SwapService from '@services/swap'
import TradeInfo from '@models/tradeInfo'
import { SWAP_FAILED_CREATE_TRADE, SWAP_FAILED_NO_LIQUIDITY } from '@constants/text'

type SwapCallBody = {
  currencyIn: string
  currencyOut: string
  amountIn: string
  allowedSlippage: number
  ttl: number
  recipient: string
}

type TradeBody = {
  currencyIn: string
  currencyOut: string
  amountIn: string
}

class SwapController {
  async swapCallParameters (req: Request, res: Response, next: NextFunction) {
    const {
      currencyIn,
      currencyOut,
      amountIn,
      allowedSlippage,
      ttl,
      recipient
    }: SwapCallBody = req.body

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() })
        return
      }

      const swapService = Container.get(SwapService)

      const swapParameters = await swapService.getSwapCallParameters(
        currencyIn,
        currencyOut,
        amountIn,
        recipient,
        allowedSlippage,
        ttl
      )

      if (!swapParameters) {
        res.status(200).json({ message: SWAP_FAILED_NO_LIQUIDITY })
        return
      }

      res.send(swapParameters)
    } catch (e) {
      next(e)
    }
  }

  async trade (req: Request, res: Response, next: NextFunction) {
    const { currencyIn, currencyOut, amountIn }: TradeBody = req.body
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() })
        return
      }

      const swapService = Container.get(SwapService)

      const trade = await swapService.getBestTradeExactIn(
        currencyIn,
        currencyOut,
        amountIn
      )

      let data

      if (trade) {
        data = { info: TradeInfo.fromTrade(trade), trade }
      } else {
        data = { error: SWAP_FAILED_CREATE_TRADE }
      }

      res.send({ data })
    } catch (e) {
      next(e)
    }
  }
}

export default new SwapController()
