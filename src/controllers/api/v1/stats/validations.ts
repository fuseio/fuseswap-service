import { handleValidations } from '@utils/handleValidations'
import { NextFunction, Request, Response } from 'express'
import { param, query } from 'express-validator'

export const getTokenStatsValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleValidations([
    param('tokenAddress').exists().isEthereumAddress().toLowerCase(),
    query('limit').exists().isString()
  ], req, res, next)
}
