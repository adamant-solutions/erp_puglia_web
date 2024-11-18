import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnagraficaRoutingModule } from './anagrafica-routing.module';
import { AnagraficaComponent } from './anagrafica.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AnagraficaComponent],
  imports: [CommonModule, AnagraficaRoutingModule, SharedModule],
})
export class AnagraficaModule {}
