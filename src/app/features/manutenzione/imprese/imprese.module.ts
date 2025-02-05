import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpreseRoutingModule } from './imprese-routing.module';
import { AddImpreseComponent } from './add-imprese/add-imprese.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditImpreseComponent } from './edit-imprese/edit-imprese.component';
import { DettagliImpreseComponent } from './dettagli-imprese/dettagli-imprese.component';



@NgModule({
  declarations: [
    AddImpreseComponent,
    EditImpreseComponent,
    DettagliImpreseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImpreseRoutingModule,
    SharedModule
  ]
})
export class ImpreseModule { }
