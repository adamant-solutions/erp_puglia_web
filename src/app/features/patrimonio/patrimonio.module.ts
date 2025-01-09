import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrimonioRoutingModule } from './patrimonio-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { PatrimonioComponent } from './patrimonio.component';

import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [PatrimonioComponent],
  imports: [CommonModule, PatrimonioRoutingModule, SharedModule],
  providers: [
    PatrimonioService,
    { provide: 'tokenUrl', useValue: environment.tokenUrl },
    { provide: 'patrimonioUrl', useValue: environment.patrimonioUrl },
  ],
})
export class PatrimonioModule {}
