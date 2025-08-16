import { BaseError } from './base-error'

export class UserNotFoundError extends BaseError {
  constructor() {
    super('User not found')
  }
}
