import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContabilitaRoutingModule} from './contabilita-routing.module';
import {ContabilitaComponent} from './contabilita.component';


@NgModule({
  declarations: [
    ContabilitaComponent
  ],
  imports: [
    CommonModule,
    ContabilitaRoutingModule
  ]
})
export class ContabilitaModule {
}
