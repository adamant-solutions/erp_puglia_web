import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CicloPassivoRoutingModule } from './ciclo-passivo-routing.module';
import { CicloPassivoComponent } from './ciclo-passivo.component';


@NgModule({
  declarations: [
    CicloPassivoComponent
  ],
  imports: [
    CommonModule,
    CicloPassivoRoutingModule
  ]
})
export class CicloPassivoModule { }
