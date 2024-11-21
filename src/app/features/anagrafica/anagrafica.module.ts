import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnagraficaRoutingModule } from './anagrafica-routing.module';
import { AnagraficaComponent } from './anagrafica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewAnagraficaComponent } from './view-anagrafica/view-anagrafica.component';

@NgModule({
  declarations: [AnagraficaComponent, ViewAnagraficaComponent],
  imports: [
    CommonModule,
    AnagraficaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AnagraficaModule {}
