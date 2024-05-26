import { NextFunction, Request, Response } from 'express';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const status: number = 500;
  const message: string = err.message || 'Something went wrong';

  return res.status(status).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
