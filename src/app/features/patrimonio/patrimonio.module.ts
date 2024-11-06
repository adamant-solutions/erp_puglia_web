import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatrimonioRoutingModule } from './patrimonio-routing.module';
import { PatrimonioComponent } from './patrimonio.component';


@NgModule({
  declarations: [
    PatrimonioComponent
  ],
  imports: [
    CommonModule,
    PatrimonioRoutingModule
  ]
})
export class PatrimonioModule { }
