import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilitaContrattiRoutingModule } from './contabilita-contratti-routing.module';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegistrazioniComponent
  ],
  imports: [
    CommonModule,
    ContabilitaContrattiRoutingModule,
    SharedModule
  ]
})
export class ContabilitaContrattiModule { }
