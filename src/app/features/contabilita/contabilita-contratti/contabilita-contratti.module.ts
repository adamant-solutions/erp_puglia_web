import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilitaContrattiRoutingModule } from './contabilita-contratti-routing.module';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRegistrazioneComponent } from './add-registrazione/add-registrazione.component';


@NgModule({
  declarations: [
    RegistrazioniComponent,
    AddRegistrazioneComponent
  ],
  imports: [
    CommonModule,
    ContabilitaContrattiRoutingModule,
    SharedModule
  ]
})
export class ContabilitaContrattiModule { }
