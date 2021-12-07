import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.status || 500;
    const message = exception.message || 'Something went wrong';
    const error =
      status === 401
        ? 'Unauthorized'
        : exception.response?.error || 'Internal Server Error';
    const body = {
      status,
      message,
      error,
      path: request.url,
    };
    response.status(status).json(body);
  }
}
