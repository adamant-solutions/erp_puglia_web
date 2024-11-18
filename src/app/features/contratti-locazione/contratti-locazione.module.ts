import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContrattiLocazioneRoutingModule} from './contratti-locazione-routing.module';
import {ContrattiLocazioneComponent} from './contratti-locazione.component';


@NgModule({
  declarations: [
    ContrattiLocazioneComponent
  ],
  imports: [
    CommonModule,
    ContrattiLocazioneRoutingModule
  ]
})
export class ContrattiLocazioneModule {
}
