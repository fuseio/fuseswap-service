import { body } from 'express-validator'
import isCurrencyOrAddress from '@utils/validators/isCurrencyOrAddress'
import isAddress from '@utils/validators/isAddress'

export const swapCallParametersValidation = [
  body('currencyIn').exists().isString().custom(isCurrencyOrAddress),
  body('currencyOut').exists().isString().custom(isCurrencyOrAddress),
  body('amountIn').exists().isString(),
  body('recipient').exists().isString().custom(isAddress)
]
