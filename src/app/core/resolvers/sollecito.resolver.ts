import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sollecito } from '../models/sollecito.model';
import { SollecitoService } from '../services/sollecito.service';

export const sollecitiResolver: ResolveFn<Sollecito[]> = (route) => {
  const morositaId = route.paramMap.get('id');
  
  if (!morositaId) {
    return of([]);
  }

  return inject(SollecitoService).getSollecitiByMorositaId(Number(morositaId)).pipe(
    catchError((error) => {

      return of([]);
    })
  );
};