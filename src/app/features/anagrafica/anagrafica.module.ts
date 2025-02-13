import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnagraficaRoutingModule } from './anagrafica-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AnagraficaComponent } from './anagrafica.component';
import { ViewAnagraficaComponent } from './view-anagrafica/view-anagrafica.component';
import { AddAnagraficaComponent } from './add-anagrafica/add-anagrafica.component';
import { EditAnagraficaComponent } from './edit-anagrafica/edit-anagrafica.component';

import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AnagraficaComponent,
    ViewAnagraficaComponent,
    AddAnagraficaComponent,
    EditAnagraficaComponent,
  ],
  imports: [CommonModule, AnagraficaRoutingModule, SharedModule],
  providers: [
    AnagraficaService
    
  ],
})
export class AnagraficaModule {}
