/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { TErrorSource } from '../interface/error';
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

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
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
