/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import { validationResult } from 'express-validator'
import SwapService from '@services/swap'

type SwapCallBody = {
  currencyIn: string
  currencyOut: string
  amountIn: string
  allowedSlippage: number
  ttl: number
  recipient: string
}

const SwapController = {
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
        res.status(200).json({ message: 'No liquidity for trade' })
        return
      }

      res.send(swapParameters)
    } catch (e) {
      next(e)
    }
  }
}

export default SwapController
