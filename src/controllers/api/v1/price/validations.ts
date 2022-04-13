import { TimeFrame } from '@services/token'
import { handleValidations } from '@utils/handleValidations'
import { NextFunction, Request, Response } from 'express'
import { param } from 'express-validator'

export const getTokenPriceValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleValidations([
    param('tokenAddress').exists().isEthereumAddress().toLowerCase()
  ], req, res, next)
}

export const getPriceChangeIntervalValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleValidations([
    param('tokenAddress').exists().isEthereumAddress().toLowerCase(),
    param('timeFrame').isIn(Object.values(TimeFrame))
  ], req, res, next)
}
