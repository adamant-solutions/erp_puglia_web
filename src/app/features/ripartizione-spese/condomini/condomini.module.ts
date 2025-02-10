import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CondominiRoutingModule } from './condomini-routing.module';
import { CondominiListComponent } from './condomini-list/condomini-list.component';


@NgModule({
  declarations: [
    CondominiListComponent
  ],
  imports: [
    CommonModule,
    CondominiRoutingModule
  ]
})
export class CondominiModule { }
