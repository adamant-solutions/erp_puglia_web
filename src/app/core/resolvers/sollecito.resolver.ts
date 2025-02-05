import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sollecito } from '../models/sollecito.model';
import { SollecitoService } from '../services/sollecito.service';

export const sollecitiResolver: ResolveFn<Sollecito | Sollecito[] | null> = (route) => {
  const morositaId = route.parent?.paramMap.get('id');
  const sollecitoId = route.paramMap.get('sollecitoId');
  
  if (!morositaId) {
    return of(null);
  }

  const sollecitoService = inject(SollecitoService);

  if (sollecitoId) {
    return sollecitoService.getSollecitoById(Number(morositaId), Number(sollecitoId)).pipe(
      catchError(() => of(null))
    );
  }

  return sollecitoService.getSollecitiByMorositaId(Number(morositaId)).pipe(
    catchError(() => of([]))
  );
};