import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeriodiGestioneRoutingModule } from './periodi-gestione-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeriodiListComponent } from './periodi-gestione-list/periodi-gestione-list.component';
import { AddPeriodoGestioneComponent } from './add-periodi-gestione/add-periodi-gestione.component';
import { ViewPeriodiGestioneComponent } from './view-periodi-gestione/view-periodi-gestione.component';
import { EditPeriodiGestioneComponent } from './edit-periodi-gestione/edit-periodi-gestione.component';


@NgModule({
  declarations: [
  
    PeriodiListComponent,
    AddPeriodoGestioneComponent,
    ViewPeriodiGestioneComponent,
    EditPeriodiGestioneComponent
      
  ],
  imports: [
    CommonModule,
    PeriodiGestioneRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PeriodiGestioneModule { }
