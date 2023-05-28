import { RequestValidationError } from '../error/ValidationError';
import { NextFunction, Request, Response } from 'express';
import { Result, validationResult } from 'express-validator';

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: Result = validationResult(req);
  if (!result.isEmpty()) {
    throw new RequestValidationError(result.array());
  }

  next();
};
