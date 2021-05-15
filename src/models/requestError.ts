export default class RequestError extends Error {
  readonly status?: number
  readonly code?: number

  constructor (status?: number, code?: number, message?: string) {
    super(message)
    this.status = status
    this.code = code
  }
}
