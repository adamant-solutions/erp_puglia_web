import { ResolveFn } from '@angular/router';
import { AppaltiSearchParams, AppaltiService } from '../../services/manutenzione-services/appalti.service';
import { inject } from '@angular/core';

export const appaltiResolver: ResolveFn<any> = (route, state, apService: AppaltiService = inject(AppaltiService)) => {

  const searchParams: AppaltiSearchParams = {
    pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
    codiceCIG: route.queryParams['codiceCIG'] || '',
    codiceCUP: route.queryParams['codiceCUP'] || '',
    stato: route.queryParams['stato'] || '',
  }; 
  return apService.getAppalti(searchParams)

}

export const appaltoByIdResolver: ResolveFn<any> = (route, state, appaltioService: AppaltiService = inject(AppaltiService)) => {
  const ID = route.params['id'];
  return appaltioService.getAppaltoByid(ID)

}

