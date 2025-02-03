import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MorositaService } from '../services/morosita.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Morosita } from '../models/morosita.model'; 
import { inject } from '@angular/core';


export const morositaResolver: ResolveFn<Morosita[] | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Morosita[] | null> => {
  return inject(MorositaService).getAllMorosita().pipe(
    catchError((error) => {
      console.error('Error fetching Morosita data:', error);
      return of(null); // Return null on error
    })
  );
};