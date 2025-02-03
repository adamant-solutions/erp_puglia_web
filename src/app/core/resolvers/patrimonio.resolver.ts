import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Patrimonio, StatoDisponibilita } from '../models/patrimonio.model';
import { PatrimonioService } from '../services/patrimonio.service';

export interface PatrimonioSearchParams {
  pagina?: number;
  indirizzo?: string;
  comune?: string;
  statoDisponibilita?: StatoDisponibilita | string
}

export const patrimonioResolver: ResolveFn<Observable<any>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const patrimonioService = inject(PatrimonioService);

    const searchParams: PatrimonioSearchParams = {
      pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
      indirizzo: route.queryParams['indirizzo'] || '',
      comune: route.queryParams['comune'] || '',
      statoDisponibilita: route.queryParams['statoDisponibilita'] || '',
    };


  return patrimonioService.getFilteredPatrimonio(searchParams).pipe(
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
