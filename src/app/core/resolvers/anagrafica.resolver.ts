import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';
import { AnagraficaService } from '../services/anagrafica.service';


export interface AnagraficaSearchParams {
  pagina?: number;
  codiceFiscale?: string;
  nome?: string;
  cognome?: string;
}


// anagraficaResolver
export const anagraficaResolver: ResolveFn<Observable<any>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const anagraficaService = inject(AnagraficaService);

  const searchParams: AnagraficaSearchParams = {    
    pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
    codiceFiscale: route.queryParams['codiceFiscale'] || '',
    nome: route.queryParams['nome'] || '',
    cognome: route.queryParams['cognome'] || ''
  };
 

  return anagraficaService.getFilteredAnagrafica(searchParams).pipe(
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
