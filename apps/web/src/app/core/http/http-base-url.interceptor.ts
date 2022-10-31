import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../helpers/env';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('http')) {
      return next.handle(request);
    }

    request = request.clone({url: `${env('API_ROOT')}/${env('API_VERSION')}${request.url}`});

    return next.handle(request);
  }
}
