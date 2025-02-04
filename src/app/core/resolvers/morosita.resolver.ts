import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MorositaService } from '../services/morosita.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Morosita, MorositaSearchParams } from '../models/morosita.model';
import { inject } from '@angular/core';
import { ModelLight } from '../models/contratto.model';



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


export const morositaResolver: ResolveFn<any> = (route) => {
  const morositaService = inject(MorositaService);

  const searchParams: MorositaSearchParams = {
    pagina: Number(route.queryParamMap.get('pagina')) || 0,
    contrattoId: route.queryParamMap.get('contrattoId') || undefined,
    stato: route.queryParamMap.get('stato') || undefined,
    importoMinimo: route.queryParamMap.get('importoMinimo') || undefined,
    importoMassimo: route.queryParamMap.get('importoMassimo') || undefined
  };

  return morositaService.searchMorosita(searchParams).pipe(
    catchError((error) => {
     
      return of(null);
    })
  );
};

export const contrattiLightResolver: ResolveFn<ModelLight[]> = (): Observable<ModelLight[]> => {
  return inject(MorositaService).getContrattiLight().pipe(
    catchError((error) => {
     
      return of([]);
    })
  );
};