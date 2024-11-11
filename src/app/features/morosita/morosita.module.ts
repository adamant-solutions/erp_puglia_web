import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MorositaRoutingModule } from './morosita-routing.module';
import { MorositaComponent } from './morosita.component';


@NgModule({
  declarations: [
    MorositaComponent
  ],
  imports: [
    CommonModule,
    MorositaRoutingModule
  ]
})
export class MorositaModule { }
