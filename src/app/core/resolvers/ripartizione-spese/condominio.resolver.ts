import { ResolveFn } from '@angular/router';
import { CondominioService } from '../../services/ripartizione-spese/condominio.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
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
    const page = route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0;
    const codice = route.queryParams['codice'] || undefined;
    const denominazione = route.queryParams['denominazione'] || undefined;
    const comune = route.queryParams['comune'] || undefined;
    const provincia = route.queryParams['provincia'] || undefined;
  
    return condominioService.getCondomini(page, 10, codice, denominazione, comune, provincia);
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