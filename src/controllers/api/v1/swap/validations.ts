import { body } from 'express-validator'
import isCurrencyOrAddress from '../../../../utils/validators/isCurrencyOrAddress'
import isAddress from '../../../../utils/validators/isAddress'

export const swapCallParametersValidation = [
  body('inputCurrency').exists().isString().custom(isCurrencyOrAddress),
  body('outputCurrency').exists().isString().custom(isCurrencyOrAddress),
  body('inputAmount').exists().isString(),
  body('recipient').exists().isString().custom(isAddress),
]
