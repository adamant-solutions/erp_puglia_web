import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MorositaService } from '../services/morosita.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Morosita } from '../models/morosita.model';
import { inject } from '@angular/core';

export const morositaResolver: ResolveFn<Morosita[] | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Morosita[] | null> => {
  return inject(MorositaService).getAllMorosita().pipe(
    catchError((error) => {

      return of(null);
    })
  );
};

export const morositaByIdResolver: ResolveFn<Morosita | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Morosita | null> => {
  const morositaId = route.paramMap.get('id');
  
  if (!morositaId) {

    return of(null);
  }

  return inject(MorositaService).getMorositaById(Number(morositaId)).pipe(
    catchError((error) => {
    
      return of(null);
    })
  );
};



