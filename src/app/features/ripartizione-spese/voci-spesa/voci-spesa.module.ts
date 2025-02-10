import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VociSpesaRoutingModule } from './voci-spesa-routing.module';
import { VociSpesaListComponent } from './voci-spesa-list/voci-spesa-list.component';


@NgModule({
  declarations: [
    VociSpesaListComponent
  ],
  imports: [
    CommonModule,
    VociSpesaRoutingModule
  ]
})
export class VociSpesaModule { }
