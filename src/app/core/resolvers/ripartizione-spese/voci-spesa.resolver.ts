import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { VoceSpesaDTO,VoceSpesaSearchParams } from '../../models/voce-spesa.model';
import { VoceSpesaService } from '../../services/ripartizione-spese/voce-spesa.service';

export const vociSpesaResolver: ResolveFn<HttpResponse<VoceSpesaDTO[]>> = (
    route,
    state,
    voceSpesaService: VoceSpesaService = inject(VoceSpesaService)
  ) => {
    const pagina = route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0;
    const size = route.queryParams['size'] ? +route.queryParams['size'] : 10;
    
    const searchParams: VoceSpesaSearchParams = {
      descrizione: route.queryParams['descrizione'],
      tipoSpesa: route.queryParams['tipoSpesa'],
      importoMinPreventivo: route.queryParams['importoMinPreventivo'] ? +route.queryParams['importoMinPreventivo'] : undefined,
      importoMaxPreventivo: route.queryParams['importoMaxPreventivo'] ? +route.queryParams['importoMaxPreventivo'] : undefined,
      importoMinConsuntivo: route.queryParams['importoMinConsuntivo'] ? +route.queryParams['importoMinConsuntivo'] : undefined,
      importoMaxConsuntivo: route.queryParams['importoMaxConsuntivo'] ? +route.queryParams['importoMaxConsuntivo'] : undefined,
      note: route.queryParams['note'],
      periodoId: route.queryParams['periodoId'] ? +route.queryParams['periodoId'] : undefined
    };
  
    return voceSpesaService.getVociSpesa(pagina, size, searchParams);
  };
  