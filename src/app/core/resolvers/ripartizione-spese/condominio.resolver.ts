import { ResolveFn } from '@angular/router';
import { CondominioService } from '../../services/ripartizione-spese/condominio.service';
import { inject } from '@angular/core';
import { catchError, forkJoin, map, of } from 'rxjs';
import { Condominio } from '../../models/condominio.model';

export interface CondominioSearchParams {
  pagina?: number;
  codice?: string;
  denominazione?: string;
  comune?: string;
  provincia?: string;
}

export const condominiAllResolver: ResolveFn<Condominio[]> = (route, state) => {
    const condominioService = inject(CondominioService);
    return condominioService.getAllCondomini();
  };
  

  export const condominioResolver: ResolveFn<any> = (
    route,
    state,
    condominioService: CondominioService = inject(CondominioService)
  ) => {
    const pagina = route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0;
    const size = route.queryParams['size'] ? +route.queryParams['size'] : 10;
    const codice = route.queryParams['codice']?.trim();
    const denominazione = route.queryParams['denominazione']?.trim();
    const comune = route.queryParams['comune']?.trim();
    const provincia = route.queryParams['provincia']?.trim();
    
    if (!codice && !denominazione && !comune && !provincia) {
      return condominioService.getAllCondomini();
    }
    
    return condominioService.getCondomini(pagina, size, codice, denominazione, comune, provincia);
  };


export const condominioByIdResolver: ResolveFn<any> = (
  route,
  state,
  condominioService: CondominioService = inject(CondominioService)
) => {
  const ID = route.params['id'];
  return condominioService.getCondominioById(ID).pipe(
    catchError(error => {
      return of(null);
    })
  );
};

export const condominioUnitasResolver: ResolveFn<any> = (
  route,
  state,
  condominioService: CondominioService = inject(CondominioService)
) => {
  const ID = route.params['id'];

  return forkJoin({
    unitaIds: condominioService.getUnitaIdsForCondominio(ID)
,
    unitaList: condominioService.getUnitaImmobiliare()
  }).pipe(
    map((result) => ({
      unitaIds: Array.isArray(result.unitaIds) ? result.unitaIds : [result.unitaIds],
      unitaList: result.unitaList || [] 
    }))
  );
};