import { Interval, Timeframe } from '@services/token'
import { handleValidations } from '@utils/handleValidations'
import { NextFunction, Request, Response } from 'express'
import { param, query } from 'express-validator'

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
    query('timeframe').isIn(Object.values(Timeframe)),
    query('interval').isIn(Object.values(Interval))
  ], req, res, next)
}
