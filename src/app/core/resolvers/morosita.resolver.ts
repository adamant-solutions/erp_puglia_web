import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MorositaService } from '../services/morosita.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Morosita } from '../models/morosita.model';
import { inject } from '@angular/core';

export const morositaResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const page = Number(route.queryParamMap.get('pagina')) || 0;
  const size = Number(route.queryParamMap.get('dimensionePagina')) || 10;
  
  return inject(MorositaService).getAllMorosita(page, size).pipe(
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


export const morositaSearchResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const page = Number(route.queryParamMap.get('pagina')) || 0;
  const size = Number(route.queryParamMap.get('dimensionePagina')) || 10;
  
  const searchParams = {
    contrattoId: route.queryParamMap.get('contrattoId') || "",
    stato: route.queryParamMap.get('stato') || "",
    importoMinimo: route.queryParamMap.get('importoMinimo') || "",
    importoMassimo: route.queryParamMap.get('importoMassimo') || ""
  };

  return inject(MorositaService).searchMorosita(searchParams, page, size).pipe(
    catchError((error) => {
      return of(null);
    })
  );
};