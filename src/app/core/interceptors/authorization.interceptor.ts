import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

    const authService = inject(AuthorizationService);

    if (request.url.includes('/oauth2/token')) {
      return next(request);
    }
    const isWriteRequest = ['POST', 'PUT', 'DELETE','PATCH'].includes(request.method);

    return authService.ensureTokenIsValid(isWriteRequest).pipe(
      switchMap(token => {
        const modifiedReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });

        return next(modifiedReq).pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {

              authService.clearTokens();

              return authService.ensureTokenIsValid(isWriteRequest).pipe(
                switchMap(newToken => {
                  const retryReq = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${newToken}`)
                  });
                  return next(retryReq);
                })
              );
            }
            throw error;
          })
        );
      })
    )
  }