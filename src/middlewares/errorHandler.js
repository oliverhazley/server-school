// src/middlewares/errorHandler.js

import { validationResult } from 'express-validator';

// 1) Validation error middleware
export const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors =>', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 2) Not found handler
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// 3) General error handler
export const errorHandler = (err, req, res, next) => {
  console.error('Error =>', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode
    }
  });
};
