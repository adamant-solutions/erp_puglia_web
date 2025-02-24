import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContabilitaRoutingModule} from './contabilita-routing.module';
import {ContabilitaComponent} from './contabilita.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ContabilitaComponent
  ],
  imports: [
    CommonModule,
    ContabilitaRoutingModule,
    SharedModule
  ]
})
export class ContabilitaModule {
}
