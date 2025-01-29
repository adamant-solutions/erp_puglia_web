import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContrattiLocazioneRoutingModule} from './contratti-locazione-routing.module';
import {ContrattiLocazioneComponent} from './contratti-locazione.component';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { environment } from 'src/environments/environment';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    ContrattiLocazioneComponent
  ],
  imports: [
    CommonModule,
    ContrattiLocazioneRoutingModule,
    SharedModule
],
   providers: [
      ContrattiService,
      { provide: 'tokenUrl', useValue: environment.tokenUrl },
      { provide: 'contrattiUrl', useValue: environment.contrattiUrl },
      {provide:'patrimonioUrl', useValue:environment.patrimonioUrl},
      {provide:'anagraficaUrl', useValue:environment.anagraficaUrl}
    ],
})
export class ContrattiLocazioneModule {
}
