import { ResolveFn } from '@angular/router';
import { PianiSearchParams, PianiService } from '../../services/manutenzione-services/piani.service';
import { inject } from '@angular/core';

export const pianiResolver: ResolveFn<any> = (route, state, pianiService: PianiService = inject(PianiService)) => {

  const searchParams: PianiSearchParams = {
    pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
    descrizione: route.queryParams['descrizione'] || '',
  }; 
  return pianiService.getPiani(searchParams)

}
