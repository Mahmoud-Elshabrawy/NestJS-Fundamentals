import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class CustomExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const Request = ctx.getRequest<Request>()
    const Response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    const exceptionResponse = exception.getResponse()
    const error = exceptionResponse === 'string' ? { message: exceptionResponse } : (exceptionResponse as object)

    Response.status(status).json({
      ...error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: Request.url
    })

  }
}
