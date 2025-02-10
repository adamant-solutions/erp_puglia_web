import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodiGestioneRoutingModule } from './periodi-gestione-routing.module';

import { PeriodiGestioneListComponent } from './periodi-gestione-list/periodi-gestione-list.component';


@NgModule({
  declarations: [
  
    PeriodiGestioneListComponent
  ],
  imports: [
    CommonModule,
    PeriodiGestioneRoutingModule
  ]
})
export class PeriodiGestioneModule { }
