import { ResolveFn } from '@angular/router';
import { RegistrazioneContabile } from '../../models/contabilita/registrazione-contabile.model';
import { RegistrazioneContabileService } from '../../services/contabilita-services/registrazione-contabile.service';
import { inject } from '@angular/core';
import { SituazioneCrediti } from '../../models/contabilita/situazione-crediti.model';

export const registrazioniContabileResolver: ResolveFn<RegistrazioneContabile[]> = (route, state) => {
    const registrazioneService = inject(RegistrazioneContabileService);
    return registrazioneService.findAll();
  };

  export const registrazioniContabileByIdResolver: ResolveFn<RegistrazioneContabile> = (route, state) => {
    const ID = route.params['registerId']
    const registrazioneService = inject(RegistrazioneContabileService);
    return registrazioneService.findById(ID);
  };



  export const registrazioniContabileByContrattoResolver: ResolveFn<RegistrazioneContabile[]> = (route, state) => {
    const ID = route.params['id']
     const registrazioneService = inject(RegistrazioneContabileService);
     return registrazioneService.findByContratto(ID);
   };
 
   export const registrazioniContabileSituazioneCreditiResolver: ResolveFn<SituazioneCrediti[]> = (route, state) => {
    const ID = route.params['id']
     const registrazioneService = inject(RegistrazioneContabileService);
     return registrazioneService.getSituazioneCrediti(ID);
   };
 
   