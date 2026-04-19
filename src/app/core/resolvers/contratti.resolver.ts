import { ResolveFn } from '@angular/router';
import { ContrattiService } from '../services/contratti.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Contratti } from '../models/contratto.model';

export interface ContrattiSearchParams {
  pagina?: number;
  indirizzo?: string,
  canoneMensileMin?: number,
  canoneMensileMax?: number,
  dataInizioFrom?: string,
  dataInizioTo?: string,
  dataFineTo?: string,
}

const emptyContrattiResponse = () =>
  new HttpResponse<Contratti[]>({
    body: [],
    headers: new HttpHeaders({
      'X-Paging-TotalRecordCount': '0',
      'X-Paging-PageCount': '0',
    }),
  });

export const contrattiResolver: ResolveFn<any> = (route, state, contrattiService: ContrattiService = inject(ContrattiService)) => {

  const searchParams: ContrattiSearchParams = {
    pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
     indirizzo : route.queryParams['indirizzo'] || '',
     canoneMensileMin : route.queryParams['canoneMensileMin'] || '',
     canoneMensileMax : route.queryParams['canoneMensileMax'] || '',
     dataInizioFrom:  route.queryParams['dataInizioFrom'] || '',
     dataInizioTo:  route.queryParams['dataInizioTo'] || '',
     dataFineTo:  route.queryParams['dataFineTo'] || '',
  };
  return contrattiService.getFilteredContratti(searchParams).pipe(
    catchError(() => of(emptyContrattiResponse()))
  );
}

export const contrattiByIdResolver: ResolveFn<any> = 
(route, state, contrattiService: ContrattiService = inject(ContrattiService)) => {
  const ID = route.params['id'];
  return contrattiService.getContrattiById(ID).pipe(
    catchError(error => {
   
      return of(null); 
    })
  );
};

export const unitaImmobiliareResolver: ResolveFn<any> = 
(route, state, service: ContrattiService = inject(ContrattiService)) => {
  return service.getUnitaImmobiliare().pipe(
    catchError(error => {
     
      return of({ body: [] }); 
    })
  );
};

export const intestatariResolver: ResolveFn<any> =
(route, state, contrattiService: ContrattiService = inject(ContrattiService)) => {
  return contrattiService.getIntestatari().pipe(
    catchError(() => of({ body: [] }))
  );
};
