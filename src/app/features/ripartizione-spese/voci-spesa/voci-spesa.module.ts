import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VociSpesaRoutingModule } from './voci-spesa-routing.module';
import { VociSpesaListComponent } from './voci-spesa-list/voci-spesa-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    VociSpesaListComponent
  ],
  imports: [
    CommonModule,
    VociSpesaRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class VociSpesaModule { }
