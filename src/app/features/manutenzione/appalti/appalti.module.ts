import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppaltiRoutingModule } from './appalti-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAppaltiComponent } from './add-appalti/add-appalti.component';
import { DettagliAppaltiComponent } from './dettagli-appalti/dettagli-appalti.component';
import { EditAppaltiComponent } from './edit-appalti/edit-appalti.component';


@NgModule({
  declarations: [
    AddAppaltiComponent,
    DettagliAppaltiComponent,
    EditAppaltiComponent
  ],
  imports: [
    CommonModule,
    AppaltiRoutingModule,
    SharedModule
  ]
})
export class AppaltiModule { }
