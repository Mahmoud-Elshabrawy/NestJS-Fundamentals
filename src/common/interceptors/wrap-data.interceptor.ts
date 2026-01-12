import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // context: description on the current request data
    // next: represents the execution of the request handler itself.
    // console.log("Before Intercept Request");

    return next.handle().pipe(map(data => {

      return { data }
      // console.log("After Intercept Response ", data);
    }));
  }
}
