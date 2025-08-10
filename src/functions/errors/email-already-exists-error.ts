import { BaseError } from './base-error'

export class EmailAlreadyExistsError extends BaseError {
  constructor() {
    super('Email already exists')
  }
}
