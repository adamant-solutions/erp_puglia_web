import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnagraficaRoutingModule } from './anagrafica-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { AnagraficaComponent } from './anagrafica.component';
import { ViewAnagraficaComponent } from './view-anagrafica/view-anagrafica.component';
import { AddAnagraficaComponent } from './add-anagrafica/add-anagrafica.component';

import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AnagraficaComponent,
    ViewAnagraficaComponent,
    AddAnagraficaComponent,
  ],
  imports: [
    CommonModule,
    AnagraficaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    AnagraficaService,
    { provide: 'anagraficaUrl', useValue: environment.anagraficaUrl },
  ],
})
export class AnagraficaModule {}
