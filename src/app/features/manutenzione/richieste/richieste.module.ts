import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RichiesteRoutingModule } from './richieste-routing.module';
import { ViewRichiesteComponent } from './view-richieste/view-richieste.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DettagliRichiestaComponent } from './dettagli-richiesta/dettagli-richiesta.component';
import { EditRichiesteComponent } from './edit-richieste/edit-richieste.component';
import { AddRichiesteComponent } from './add-richieste/add-richieste.component';


@NgModule({
  declarations: [
    ViewRichiesteComponent,
    DettagliRichiestaComponent,
    EditRichiesteComponent,
    AddRichiesteComponent
  ],
  imports: [
    CommonModule,
    RichiesteRoutingModule,
    SharedModule,
  ]
})
export class RichiesteModule { }
