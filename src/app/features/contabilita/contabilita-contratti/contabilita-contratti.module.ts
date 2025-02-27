import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilitaContrattiRoutingModule } from './contabilita-contratti-routing.module';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRegistrazioneComponent } from './add-registrazione/add-registrazione.component';
import { ContrattiListComponent } from './contratti-list/contratti-list.component';
import { SituazioneCreditiComponent } from './situazione-crediti/situazione-crediti.component';
import { AddPagamentiComponent } from './add-pagamenti/add-pagamenti.component';
import { EditRegistrazioneComponent } from './edit-registrazione/edit-registrazione.component';


@NgModule({
  declarations: [
    RegistrazioniComponent,
    AddRegistrazioneComponent,
    EditRegistrazioneComponent,
    ContrattiListComponent,
    SituazioneCreditiComponent,
    AddPagamentiComponent
  ],
  imports: [
    CommonModule,
    ContabilitaContrattiRoutingModule,
    SharedModule
  ]
})
export class ContabilitaContrattiModule { }
