import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpExcetpion extends HttpException {
  constructor(message, statusCode) {
    super(message, statusCode)
  }
}
