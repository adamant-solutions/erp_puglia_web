import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Patrimonio } from '../models/patrimonio.model';
import { PatrimonioService } from '../services/patrimonio.service';

// patrimonioResolver
export const patrimonioResolver: ResolveFn<Observable<Patrimonio[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const patrimonioService = inject(PatrimonioService);

  return patrimonioService.getPatrimonio().pipe(
    catchError((error) => {
      console.error('Error fetching patrimonio data:', error);
      return of([]);
    })
  );
};
