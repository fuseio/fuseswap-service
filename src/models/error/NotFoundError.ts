import HttpStatus from 'http-status-codes'
import { ErrorCodes } from '@constants/error'
import RequestError from '@models/requestError'

export default class NotFoundError extends RequestError {
  constructor () {
    super(HttpStatus.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Not found')
  }
}
