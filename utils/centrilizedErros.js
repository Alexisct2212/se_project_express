// Single custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Optionally, you can add a status field:
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Mark as operational so you can differentiate from programming errors
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Factory functions for specific error types
const badRequestError = (message = 'Bad Request') => new AppError(message, 400);
const unauthorizedError = (message = 'Unauthorized') => new AppError(message, 401);
const forbiddenError = (message = 'Forbidden') => new AppError(message, 403);
const notFoundError = (message = 'Not Found') => new AppError(message, 404);
const conflictError = (message = 'Conflict') => new AppError(message, 409);
const internalServerError = (message = 'Internal Server Error') => new AppError(message, 500);

// Centralized error-handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  // Use a generic message for 500 errors to avoid leaking sensitive details.
  const message = statusCode === 500
    ? "An error has occurred on the server."
    : err.message;
  res.status(statusCode).send({ message });
};

module.exports = {
  AppError,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  notFoundError,
  conflictError,
  internalServerError,
  errorHandler,
};
