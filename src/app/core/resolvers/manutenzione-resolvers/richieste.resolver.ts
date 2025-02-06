import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RichiesteSearchParams, RichiesteService } from '../../services/manutenzione-services/richieste.service';


export const richiesteResolver: ResolveFn<any> = (route, state, rService: RichiesteService = inject(RichiesteService)) => {

  const searchParams: RichiesteSearchParams = {
    pagina: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
    descrizione: route.queryParams['descrizione'] || '',
    stato: route.queryParams['stato'] || '',
  }; 
  return rService.getRichieste(searchParams)

}

export const richiesteByIdResolver: ResolveFn<any> = (route, state, rService: RichiesteService = inject(RichiesteService)) => {
  const ID = route.params['id'];
  return rService.getRichiestaByid(ID)

}

