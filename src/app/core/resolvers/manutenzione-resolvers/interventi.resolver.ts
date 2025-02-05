import { ResolveFn } from '@angular/router';
import { InterventiSearchParams, InterventiService } from '../../services/manutenzione-services/interventi.service';
import { inject } from '@angular/core';


export const interventiResolver: ResolveFn<any> = (route, state, intService: InterventiService = inject(InterventiService)) => {

  const searchParams: InterventiSearchParams = {
    pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
    descrizione: route.queryParams['descrizione'] || '',
    stato: route.queryParams['stato'] || '',
  }; 
  return intService.getInterventi(searchParams)

}
