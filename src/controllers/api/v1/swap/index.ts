/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import SwapService from '../../../../services/swap'

type SwapCallBody = {
  inputCurrency: string
  outputCurrency: string
  inputAmount: string
  allowedSlippage: string
  ttl: number
  recipient: string
}

const SwapController = {
  async swapCallParameters(req: Request, res: Response, next: NextFunction) {
    const {
      inputCurrency,
      outputCurrency,
      inputAmount,
      allowedSlippage,
      ttl,
      recipient,
    }: SwapCallBody = req.body

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() })
        return
      }

      const swapParameters = SwapService.getSwapCallParameters(
        inputCurrency,
        outputCurrency,
        inputAmount,
        recipient,
        allowedSlippage,
        ttl
      )

      res.send(swapParameters)
    } catch (e) {
      next(e)
    }
  },
}

export default SwapController
