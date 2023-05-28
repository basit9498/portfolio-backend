export abstract class CustomError extends Error {
  abstract status_code: number;
  constructor(message: string) {
    super(message);
  }
  // public serializer(): { message: string; status_code: number } {
  //   return { message: this.message, status_code: this.status_code };
  // }

  abstract serializerError(): { message: string; field?: string }[];
}
