import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { NotificationService } from '../services/notification.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthorizationService);
  const notifications = inject(NotificationService);

  if (request.url.includes('/auth/login')) {
    return next(request);
  }

  const token = auth.getToken();
  const authReq = token
    ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
    : request;

  return next(authReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          auth.logout();
        } else if (err.status === 403) {
          notifications.addNotification({
            message: 'Non hai i permessi per accedere a questa risorsa.',
            type: 'error',
            timeout: 4000,
          });
        }
      }
      return throwError(() => err);
    })
  );
};
