// Mongoose Validation Error

import mongoose, { CastError } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode,
    message: 'Mongoose Validation Error',
    errorSources,
  };
};

export default handleValidationError;
