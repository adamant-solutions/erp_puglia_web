import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventiRoutingModule } from './interventi-routing.module';
import { DettagliInterventiComponent } from './dettagli-interventi/dettagli-interventi.component';
import { EditInterventiComponent } from './edit-interventi/edit-interventi.component';
import { AddInterventiComponent } from './add-interventi/add-interventi.component';



@NgModule({
  declarations: [
    DettagliInterventiComponent,
    EditInterventiComponent,
    AddInterventiComponent
  ],
  imports: [
    CommonModule,
    InterventiRoutingModule
  ]
})
export class InterventiModule { }
