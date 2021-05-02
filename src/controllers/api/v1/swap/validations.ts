import { body } from 'express-validator'
import isFuseOrAddress from '@utils/validators/isFuseOrAddress'
import { handleValidations } from '@utils/handleValidations'
import { Request, Response, NextFunction } from 'express'

export const requestParametersValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleValidations([
    body('currencyIn').exists().isString().custom(isFuseOrAddress).toLowerCase(),
    body('currencyOut').exists().isString().custom(isFuseOrAddress).toLowerCase(),
    body('amountIn').exists().isString(),
    body('recipient').exists().isEthereumAddress().toLowerCase()
  ], req, res, next)
}

export const quoteValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleValidations([
    body('currencyIn').exists().isString().custom(isFuseOrAddress).toLowerCase(),
    body('currencyOut').exists().isString().custom(isFuseOrAddress).toLowerCase(),
    body('amountIn').exists().isString()
  ], req, res, next)
}
