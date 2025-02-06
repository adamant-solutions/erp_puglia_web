import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RichiesteRoutingModule } from './richieste-routing.module';
import { ViewRichiesteComponent } from './view-richieste/view-richieste.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ViewRichiesteComponent
  ],
  imports: [
    CommonModule,
    RichiesteRoutingModule,
    SharedModule,
  ]
})
export class RichiesteModule { }
