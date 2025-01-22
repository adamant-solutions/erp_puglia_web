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

  const pageNumber = route.queryParamMap.get('pagina')
    ? Number(route.queryParamMap.get('pagina'))
    : 0;

  return patrimonioService.getPatrimonio(pageNumber).pipe(
    catchError((error) => {
      console.error('Error fetching patrimonio data:', error);
      return of([]);
    })
  );
};

// patrimonioByIdResolver
export const patrimonioByIdResolver: ResolveFn<Patrimonio | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Patrimonio | null> => {
  const id = Number(route.paramMap.get('patrimonioId'));

  return inject(PatrimonioService)
    .getPatrimonioById(id)
    .pipe(
      catchError((error) => {
        console.error('Error fetching patrimonio:', error); // Log the error
        return of(null); // Return `null` in case of an error
      })
    );
};
