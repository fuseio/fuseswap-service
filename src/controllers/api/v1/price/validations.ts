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
