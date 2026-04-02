const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {

  statusCode: number;
  isOperational: boolean;
  logError?: unknown;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean = true,
    logError?: unknown,
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.logError = logError;

    Error.captureStackTrace(this);
  }

  
}

// 500 — API / unexpected errors
export class APIError extends AppError { 
  constructor(logError?: unknown) {
    super(
      'API_ERROR',
      STATUS_CODES.INTERNAL_ERROR,
      'Internal Server Error',
      false,
      logError
    );
  }
}

// 400 — Bad Request
export class BadRequestError extends AppError {
  constructor(description:string, logError?: unknown) {
    super(
      'BAD_REQUEST',
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      logError
    );
  }
}

// 400 — Validation Error
export class ValidationError extends AppError {
  constructor(description:string, logError?: unknown) {
    super(
      'VALIDATION_ERROR',
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      logError
    );
  }
}



