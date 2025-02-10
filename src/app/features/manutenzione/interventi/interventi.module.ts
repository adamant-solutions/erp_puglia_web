import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventiRoutingModule } from './interventi-routing.module';
import { DettagliInterventiComponent } from './dettagli-interventi/dettagli-interventi.component';
import { EditInterventiComponent } from './edit-interventi/edit-interventi.component';
import { AddInterventiComponent } from './add-interventi/add-interventi.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DettagliInterventiComponent,
    EditInterventiComponent,
    AddInterventiComponent
  ],
  imports: [
    CommonModule,
    InterventiRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InterventiModule { }
