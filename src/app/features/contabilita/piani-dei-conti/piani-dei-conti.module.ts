import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PianiDeiContiRoutingModule } from './piani-dei-conti-routing.module';
import { PianiContiListComponent } from './piani-conti-list/piani-conti-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PianiContiListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PianiDeiContiRoutingModule
  ]
})
export class PianiDeiContiModule { }
