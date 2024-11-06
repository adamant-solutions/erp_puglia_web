import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnagraficaRoutingModule } from './anagrafica-routing.module';
import { AnagraficaComponent } from './anagrafica.component';


@NgModule({
  declarations: [
    AnagraficaComponent
  ],
  imports: [
    CommonModule,
    AnagraficaRoutingModule
  ]
})
export class AnagraficaModule { }
