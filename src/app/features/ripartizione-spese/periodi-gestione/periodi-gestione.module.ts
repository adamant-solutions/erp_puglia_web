import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeriodiGestioneRoutingModule } from './periodi-gestione-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeriodiListComponent } from './periodi-gestione-list/periodi-gestione-list.component';


@NgModule({
  declarations: [
  
    PeriodiListComponent
  ],
  imports: [
    CommonModule,
    PeriodiGestioneRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PeriodiGestioneModule { }
