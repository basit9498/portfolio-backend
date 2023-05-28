import { FieldValidationError, ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  status_code = 400;
  constructor(public validationError: FieldValidationError[]) {
    super('Invalid Request Paramter');
  }
  public serializerError() {
    return this.validationError.map((err) => {
      return { message: err.msg, field: err.path };
    });
  }
}
