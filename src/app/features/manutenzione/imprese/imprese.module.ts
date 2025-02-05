import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpreseRoutingModule } from './imprese-routing.module';
import { AddImpreseComponent } from './add-imprese/add-imprese.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AddImpreseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImpreseRoutingModule  ,
    SharedModule
  ]
})
export class ImpreseModule { }
