import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianiRoutingModule } from './piani-routing.module';
import { AddPianiComponent } from './add-piani/add-piani.component';
import { EditPianiComponent } from './edit-piani/edit-piani.component';
import { DettagliPianiComponent } from './dettagli-piani/dettagli-piani.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AddPianiComponent,
    EditPianiComponent,
    DettagliPianiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PianiRoutingModule,
    SharedModule
  ]
})
export class PianiModule { }
