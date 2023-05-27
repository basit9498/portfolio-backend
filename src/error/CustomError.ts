export class CustomError extends Error {
  status_code: number;
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status_code = status;
  }
  public serializer(): { message: string; status_code: number } {
    return { message: this.message, status_code: this.status_code };
  }
}
