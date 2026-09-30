import { env } from '../../config/env.js';
import AppError from '../errors/AppError.js';

export default function errorHandler(error, _req, res, _next) {
  void _next;
  let normalized = error;
  if (error.name === 'CastError') normalized = new AppError(400, 'Invalid resource identifier');
  if (error.code === 11000) normalized = new AppError(409, 'A record with that value already exists', error.keyValue);

  const statusCode = normalized.statusCode || 500;
  const response = {
    success: false,
    message: statusCode === 500 ? 'Internal server error' : normalized.message,
  };
  if (normalized.details) response.details = normalized.details;
  if (env.NODE_ENV === 'development' && statusCode === 500) response.stack = error.stack;
  if (statusCode === 500) console.error(error);
  res.status(statusCode).json(response);
}
