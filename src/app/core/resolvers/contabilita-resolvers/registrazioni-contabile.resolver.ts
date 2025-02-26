import { ResolveFn } from '@angular/router';
import { RegistrazioneContabile } from '../../models/contabilita/registrazione-contabile.model';
import { RegistrazioneContabileService } from '../../services/contabilita-services/registrazione-contabile.service';
import { inject } from '@angular/core';

export const registrazioniContabileResolver: ResolveFn<RegistrazioneContabile[]> = (route, state) => {
    const registrazioneService = inject(RegistrazioneContabileService);
    return registrazioneService.findAll();
  };


  export const registrazioniContabileByContrattoResolver: ResolveFn<RegistrazioneContabile[]> = (route, state) => {
    const ID = route.params['id']
     const registrazioneService = inject(RegistrazioneContabileService);
     return registrazioneService.findByContratto(ID);
   };
 
   