import { body } from 'express-validator'
import isAddress from '../../../../utils/validators/isAddress'

export const swapCallParametersValidation = [
  body('inputCurrency').exists().isString().custom(isAddress),
  body('outputCurrency').exists().isString().custom(isAddress),
  body('inputAmount').exists().isString(),
  body('recipient').exists().isString().custom(isAddress),
]
