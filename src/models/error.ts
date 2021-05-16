import HttpStatus from 'http-status-codes'
import { ErrorCodes } from '@constants/error'
import RequestError from '@models/requestError'

export class HighPriceImpactError extends RequestError {
  constructor () {
    super(HttpStatus.OK, ErrorCodes.HIGH_PRICE_IMPACT, 'Price impact is too high')
  }
}

export class NoPoolLiquidityError extends RequestError {
  constructor () {
    super(HttpStatus.OK, ErrorCodes.NO_POOL_LIQUIDITY, 'Pool is out of liquidity')
  }
}

export class NotFoundError extends RequestError {
  constructor () {
    super(HttpStatus.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Not found')
  }
}
