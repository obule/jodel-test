export enum StatusCode {
  Success = 200,
  InternalServerError = 500,
  NotFound = 404,
  BadRequest = 400,
}

export enum ErrorMessage {
  InvalidCountryCode = 'Please supply an ISO31661 compliant country code.',
}

export enum ErrorCode {
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
}

export class EntityNotFoundError extends Error {
  public constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'EntityNotFoundError' });
  }
}
