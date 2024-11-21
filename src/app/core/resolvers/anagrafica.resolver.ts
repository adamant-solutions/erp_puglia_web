import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';
import { AnagraficaService } from '../services/anagrafica.service';

// anagraficaResolver
export const anagraficaResolver: ResolveFn<Observable<Anagrafica[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const anagraficaService = inject(AnagraficaService);

  return anagraficaService.getAnagrafica().pipe(
    catchError((error) => {
      console.error('Error fetching anagrafica data:', error);
      return of([]);
    })
  );
};

// anagraficaByIdResolver
export const anagraficaByIdResolver: ResolveFn<Anagrafica | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Anagrafica | null> => {
  const id = Number(route.paramMap.get('anagraficaId'));

  return inject(AnagraficaService)
    .getAnagraficaById(id)
    .pipe(
      catchError((error) => {
        console.error('Error fetching anagrafica:', error); // Log the error
        return of(null); // Return `null` in case of an error
      })
    );
};
