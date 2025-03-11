import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatoPagamentiRoutingModule } from './stato-pagamenti-routing.module';
import { StatoPagamentiListComponent } from './stato-pagamenti-list/stato-pagamenti-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StatoPagamentiListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatoPagamentiRoutingModule
  ]
})
export class StatoPagamentiModule { }
