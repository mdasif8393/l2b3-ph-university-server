/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,

  next: NextFunction,
) => {
  // setting default values
  let statusCode: number = err.statusCode || 500;
  let message: string = err.message || 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // Zod validation error
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // mongoose validation error
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // Cast error for query data using invalid id
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // Duplicate Error to create department which already exists
  else if (err?.code === 110000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : '',
  });
};

export default globalErrorHandler;

// pattern
/* 
  success:
  message:
  errorSources: [
  Path: ‘ ’,
  Message: ‘ ’
  ],
  Stack:

**/
