import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatrimonioRoutingModule} from './patrimonio-routing.module';
import {PatrimonioComponent} from './patrimonio.component';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PatrimonioComponent],
  imports: [CommonModule, PatrimonioRoutingModule, SharedModule],
})
export class PatrimonioModule {
}
