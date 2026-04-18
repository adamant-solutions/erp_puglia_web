import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthorizationService);

  if (request.url.includes('/auth/login')) {
    return next(request);
  }

  const token = auth.getToken();
  const authReq = token
    ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
    : request;

  return next(authReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        auth.logout();
      }
      return throwError(() => err);
    })
  );
};
