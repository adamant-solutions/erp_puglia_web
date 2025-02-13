import { ResolveFn } from '@angular/router';
import { PeriodoGestioneService } from '../../services/ripartizione-spese/periodi-gestione.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { PeriodiGestione } from '../../models/periodi-gestione.model';

export interface PeriodoSearchParams {
  pagina?: number;
  dataInizio?: string;
  dataFine?: string;
  stato?: string;
}


export const periodiAllResolver: ResolveFn<PeriodiGestione[]> = (route, state) => {
  const periodoService = inject(PeriodoGestioneService);
  return periodoService.getAllPeriodi();
};


export const periodoResolver: ResolveFn<any> = (
  route,
  state,
  periodoService: PeriodoGestioneService = inject(PeriodoGestioneService)
) => {
  const page = route.queryParams['page'] ? +route.queryParams['page'] : 0;
  const size = route.queryParams['size'] ? +route.queryParams['size'] : 10;
  const dataInizio = route.queryParams['dataInizio']?.trim();
  const dataFine = route.queryParams['dataFine']?.trim();
  const stato = route.queryParams['stato']?.trim();
  
  if (!dataInizio && !dataFine && !stato) {
    return periodoService.getAllPeriodi();
  }
  
  return periodoService.getPeriodi(page, size, dataInizio, dataFine, stato);
};


export const periodoByIdResolver: ResolveFn<any> = (
  route,
  state,
  periodoService: PeriodoGestioneService = inject(PeriodoGestioneService)
) => {
  const ID = route.params['id'];
  return periodoService.getPeriodoById(ID).pipe(
    catchError(error => {
      return of(null);
    })
  );
};


export const periodiByCondominioResolver: ResolveFn<any> = (
  route,
  state,
  periodoService: PeriodoGestioneService = inject(PeriodoGestioneService)
) => {
  const condominioId = route.params['condominioId'];
  return periodoService.getPeriodoByCondominioId(condominioId).pipe(
    catchError(error => {
      return of([]);
    })
  );
};


export const periodoAttivoResolver: ResolveFn<any> = (
  route,
  state,
  periodoService: PeriodoGestioneService = inject(PeriodoGestioneService)
) => {
  const condominioId = route.params['condominioId'];
  return periodoService.getPeriodoAttivo(condominioId).pipe(
    catchError(error => {
      return of(null);
    })
  );
};