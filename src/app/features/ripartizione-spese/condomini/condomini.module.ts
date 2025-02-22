import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CondominiRoutingModule } from './condomini-routing.module';
import { CondominiListComponent } from './condomini-list/condomini-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCondominiComponent } from './view-condomini/view-condomini.component';
import { EditCondominiComponent } from './edit-condomini/edit-condomini.component';
import { AddCondominiComponent } from './condomini-list/add-condomini/add-condomini.component';


@NgModule({
  declarations: [
    CondominiListComponent,
    ViewCondominiComponent,
    EditCondominiComponent,
    AddCondominiComponent
  ],
  imports: [
    CommonModule,
    CondominiRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CondominiModule { }
