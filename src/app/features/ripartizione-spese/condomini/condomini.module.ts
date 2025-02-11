import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CondominiRoutingModule } from './condomini-routing.module';
import { CondominiListComponent } from './condomini-list/condomini-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CondominiListComponent
  ],
  imports: [
    CommonModule,
    CondominiRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CondominiModule { }
