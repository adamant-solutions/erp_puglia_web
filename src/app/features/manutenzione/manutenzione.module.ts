import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManutenzioneRoutingModule} from './manutenzione-routing.module';
import {ManutenzioneComponent} from './manutenzione.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ViewImpreseComponent } from './imprese/view-imprese/view-imprese.component';
import { ViewPianiComponent } from './piani/view-piani/view-piani.component';
import { ViewAppaltiComponent } from './appalti/view-appalti/view-appalti.component';
import { ViewInterventiComponent } from './interventi/view-interventi/view-interventi.component';



@NgModule({
  declarations: [
    ManutenzioneComponent,
    ViewImpreseComponent,
    ViewPianiComponent,
    ViewAppaltiComponent,
    ViewInterventiComponent
  ],
  imports: [
    CommonModule,
    ManutenzioneRoutingModule,
    SharedModule
  ]
})
export class ManutenzioneModule {
}
