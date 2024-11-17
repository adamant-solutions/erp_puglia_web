import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManutenzioneRoutingModule} from './manutenzione-routing.module';
import {ManutenzioneComponent} from './manutenzione.component';


@NgModule({
  declarations: [
    ManutenzioneComponent
  ],
  imports: [
    CommonModule,
    ManutenzioneRoutingModule
  ]
})
export class ManutenzioneModule {
}
