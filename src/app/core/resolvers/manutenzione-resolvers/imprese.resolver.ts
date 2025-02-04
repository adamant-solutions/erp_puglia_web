import { ResolveFn } from '@angular/router';
import { ImpreseSearchParams, ImpreseService } from '../../services/manutenzione-services/imprese.service';
import { inject } from '@angular/core';


export const impreseResolver: ResolveFn<any> = (route, state, impreseService: ImpreseService = inject(ImpreseService)) => {

  const searchParams: ImpreseSearchParams = {
    pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
    ragioneSociale : route.queryParams['ragioneSociale'] || '',
    partitaIva : route.queryParams['partitaIva'] || '',
  }; 
  return impreseService.getImpresse(searchParams)

}
