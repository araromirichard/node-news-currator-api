export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ResourceNotFoundError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 404) {
    super(message);
    this.statusCode = statusCode;
  }
}
