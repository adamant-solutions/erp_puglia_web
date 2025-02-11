import { ResolveFn } from '@angular/router';
import { CondominioService } from '../../services/ripartizione-spese/condominio.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
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
    const page = route.queryParams['page'] ? +route.queryParams['page'] : 0;
    const size = route.queryParams['size'] ? +route.queryParams['size'] : 10;
    const codice = route.queryParams['codice']?.trim();
    const denominazione = route.queryParams['denominazione']?.trim();
    const comune = route.queryParams['comune']?.trim();
    const provincia = route.queryParams['provincia']?.trim();
    
    if (!codice && !denominazione && !comune && !provincia) {
      return condominioService.getAllCondomini();
    }
    
    return condominioService.getCondomini(page, size, codice, denominazione, comune, provincia);
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