import HttpStatus from 'http-status-codes'
import { ErrorCodes } from '@constants/error'
import RequestError from '@models/requestError'

export default class HighPriceImpactError extends RequestError {
  constructor () {
    super(HttpStatus.OK, ErrorCodes.HIGH_PRICE_IMPACT, 'Price impact is too high')
  }
}
