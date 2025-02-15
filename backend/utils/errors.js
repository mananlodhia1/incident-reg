class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

class ValidationError extends AppError {
    constructor(message) {
      super(message, 400);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message) {
      super(message, 404);
    }
  }
  
  class ConflictError extends AppError {
    constructor(message) {
      super(message, 409);
    }
  }
  
  class ServiceError extends AppError {
    constructor(message) {
      super(message, 500);
    }
  }
  
  class DatabaseError extends AppError {
    constructor(message) {
      super(`Database Error: ${message}`, 500);
    }
  }

  export { AppError, ValidationError, NotFoundError, ConflictError, ServiceError, DatabaseError };
