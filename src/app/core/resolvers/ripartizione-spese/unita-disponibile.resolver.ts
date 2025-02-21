import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { VoceSpesaService } from '../../services/ripartizione-spese/voce-spesa.service';
import { UnitaDisponibile } from '../../models/unita-disponibile.model';

export const unitaDisponibiliResolver: ResolveFn<UnitaDisponibile[]> = (route, state) => {
  const voceSpesaService = inject(VoceSpesaService);
  const voceSpesaId = route.paramMap.get('id');
  return voceSpesaService.getUnitaDisponibili(Number(voceSpesaId));
};