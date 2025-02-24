import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VociSpesaRoutingModule } from './voci-spesa-routing.module';
import { VociSpesaListComponent } from './voci-spesa-list/voci-spesa-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddVociSpesaComponent } from './add-voci-spesa/add-voci-spesa.component';
import { EditVociSpesaComponent } from './edit-voci-spesa/edit-voci-spesa.component';
import { ViewVociSpesaComponent } from './view-voci-spesa/view-voci-spesa.component';



@NgModule({
  declarations: [
    VociSpesaListComponent,
    AddVociSpesaComponent,
    EditVociSpesaComponent,
    ViewVociSpesaComponent
  ],
  imports: [
    CommonModule,
    VociSpesaRoutingModule,
    FormsModule,
    SharedModule,
    
  ]
})
export class VociSpesaModule { }
