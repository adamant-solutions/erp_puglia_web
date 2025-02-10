import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatoPagamentiRoutingModule } from './stato-pagamenti-routing.module';
import { StatoPagamentiListComponent } from './stato-pagamenti-list/stato-pagamenti-list.component';


@NgModule({
  declarations: [
    StatoPagamentiListComponent
  ],
  imports: [
    CommonModule,
    StatoPagamentiRoutingModule
  ]
})
export class StatoPagamentiModule { }
