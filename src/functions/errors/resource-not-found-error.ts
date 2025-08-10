import { BaseError } from './base-error'

export class ResourceNotFoundError extends BaseError {
  constructor() {
    super('Resource not exists')
  }
}
