import { CustomError } from './CustomError';

export class ForbiddenError extends CustomError {
  status_code = 403;
  constructor(private custom_message = 'Please active your active!!!') {
    super(custom_message);
  }
  serializerError() {
    return [{ message: this.custom_message }];
  }
}
