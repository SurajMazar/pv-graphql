import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  public code: string;
  public errors: any;

  constructor(
    private readonly payload: { message: string; code: string; errors?: any },
  ) {
    super(payload?.message, HttpStatus.BAD_REQUEST);
    this.code = payload?.code;
    this.errors = payload?.errors;
  }
}
