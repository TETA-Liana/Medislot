import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, params, query, user } = request;
    const now = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${url} | Body: ${JSON.stringify(body)} | Params: ${JSON.stringify(params)} | Query: ${JSON.stringify(query)} | User: ${user?.id || 'Anonymous'}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = Date.now() - now;
          this.logger.log(
            `Response: ${method} ${url} - ${responseTime}ms | Status: Success`,
          );
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          this.logger.error(
            `Response: ${method} ${url} - ${responseTime}ms | Status: Error | Message: ${error.message}`,
          );
        },
      }),
    );
  }
}
