import HttpStatus from 'http-status-codes'
import { ErrorCodes } from '@constants/error'
import RequestError from '@models/requestError'

export default class NoPoolLiquidityError extends RequestError {
  constructor () {
    super(HttpStatus.OK, ErrorCodes.NO_POOL_LIQUIDITY, 'Pool is out of liquidity')
  }
}
