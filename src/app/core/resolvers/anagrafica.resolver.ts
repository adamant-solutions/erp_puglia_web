import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';
import { AnagraficaService } from '../services/anagrafica.service';

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
