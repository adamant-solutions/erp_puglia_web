import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthorizationService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;
  router.navigate(['/login'], { queryParams: { redirect: state.url } });
  return false;
};

export const roleGuard = (role: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthorizationService);
    const router = inject(Router);
    if (!auth.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }
    if (!auth.hasRole(role)) {
      router.navigate(['/']);
      return false;
    }
    return true;
  };
};
