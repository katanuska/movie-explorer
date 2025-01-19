import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected database error occurred';

    if ((exception as any).code === '23505') {
      statusCode = HttpStatus.CONFLICT;
      message =
        'A unique constraint was violated. Please ensure the data is unique.';
    } else if ((exception as any).code === '23503') {
      statusCode = HttpStatus.BAD_REQUEST;
      message =
        'A foreign key constraint was violated. Ensure the related record exists.';
    } else if ((exception as any).code === '23502') {
      statusCode = HttpStatus.BAD_REQUEST;
      message =
        'A NOT NULL constraint was violated. Ensure all required fields are filled.';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      detail: exception.message,
    });
  }
}
