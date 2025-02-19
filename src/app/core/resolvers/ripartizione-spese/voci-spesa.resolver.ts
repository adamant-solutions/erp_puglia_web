import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { VoceSpesaDTO } from '../../models/voce-spesa.model';
import { VoceSpesaService } from '../../services/ripartizione-spese/voce-spesa.service';
import { PeriodoLight } from '../../models/periodi-gestione.model';

export const vociSpesaResolver: ResolveFn<HttpResponse<VoceSpesaDTO[]>> = (
  route,
  state,
  voceSpesaService: VoceSpesaService = inject(VoceSpesaService)
) => {
  const searchParams = {
    page: route.queryParams['pagina'] ? +route.queryParams['pagina'] : 0,
 
    descrizione: route.queryParams['descrizione'],
    periodoId: route.queryParams['periodoId'] ? route.queryParams['periodoId'] : ""
  };

  return voceSpesaService.getVociSpesa(searchParams);
};

export const periodiResolver: ResolveFn<PeriodoLight[]> = (
  route,
  state,
  voceSpesaService: VoceSpesaService = inject(VoceSpesaService)
) => {
  return voceSpesaService.getPeriodi();
};


export const voceSpesaResolverID: ResolveFn<VoceSpesaDTO> = (
  route,
  state,
  voceSpesaService: VoceSpesaService = inject(VoceSpesaService)
) => {
  const id = route.paramMap.get('id');
  return voceSpesaService.getVoceSpesa(Number(id));
};