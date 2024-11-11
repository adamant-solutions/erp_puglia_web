import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RipartizioneSpeseRoutingModule } from './ripartizione-spese-routing.module';
import { RipartizioneSpeseComponent } from './ripartizione-spese.component';


@NgModule({
  declarations: [
    RipartizioneSpeseComponent
  ],
  imports: [
    CommonModule,
    RipartizioneSpeseRoutingModule
  ]
})
export class RipartizioneSpeseModule { }
