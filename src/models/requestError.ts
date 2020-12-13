export default class RequestError extends Error {
  readonly status: number | undefined;

  constructor(status?: number, message?: string) {
    super(message)
    this.status = status;
  }
}
