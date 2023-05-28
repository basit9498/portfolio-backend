import { CustomError } from './CustomError';

export class BadRequest extends CustomError {
  status_code = 400;
  constructor(private custom_messaage: string = "'Invalid Request Paramter'") {
    super(custom_messaage);
  }
  serializerError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
