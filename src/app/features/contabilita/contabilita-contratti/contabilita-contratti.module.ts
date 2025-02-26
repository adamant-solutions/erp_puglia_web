import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilitaContrattiRoutingModule } from './contabilita-contratti-routing.module';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRegistrazioneComponent } from './add-registrazione/add-registrazione.component';
import { ContrattiListComponent } from './contratti-list/contratti-list.component';
import { SituazioneCreditiComponent } from './situazione-crediti/situazione-crediti.component';


@NgModule({
  declarations: [
    RegistrazioniComponent,
    AddRegistrazioneComponent,
    ContrattiListComponent,
    SituazioneCreditiComponent
  ],
  imports: [
    CommonModule,
    ContabilitaContrattiRoutingModule,
    SharedModule
  ]
})
export class ContabilitaContrattiModule { }
