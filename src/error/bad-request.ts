import { CustomError } from './CustomError';

export class BadRequest extends CustomError {
  status_code = 400;
  constructor(private custom_message: string = "'Invalid Request Parameter'") {
    super(custom_message);
  }
  serializerError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
