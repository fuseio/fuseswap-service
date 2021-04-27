import { body } from 'express-validator'
import isCurrencyOrAddress from '@utils/validators/isCurrencyOrAddress'
import { handleValidations } from '@utils/handleValidations'
import { Request, Response, NextFunction } from 'express'

export const swapCallParametersValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleValidations([
    body('currencyIn').exists().isString().custom(isCurrencyOrAddress).toLowerCase(),
    body('currencyOut').exists().isString().custom(isCurrencyOrAddress).toLowerCase(),
    body('amountIn').exists().isString(),
    body('recipient').exists().isEthereumAddress().toLowerCase()
  ], req, res, next)
}

export const tradeValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleValidations([
    body('currencyIn').exists().isString().custom(isCurrencyOrAddress).toLowerCase(),
    body('currencyOut').exists().isString().custom(isCurrencyOrAddress).toLowerCase(),
    body('amountIn').exists().isString()
  ], req, res, next)
}
