import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrimonioRoutingModule } from './patrimonio-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { PatrimonioComponent } from './patrimonio.component';
import { ViewPatrimonioComponent } from './view-patrimonio/view-patrimonio.component';
import { AddPatrimonioComponent } from './add-patrimonio/add-patrimonio.component';
import { EditPatrimonioComponent } from './edit-patrimonio/edit-patrimonio.component';

import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    PatrimonioComponent,
    ViewPatrimonioComponent,
    AddPatrimonioComponent,
    EditPatrimonioComponent,
  ],
  imports: [CommonModule, PatrimonioRoutingModule, SharedModule],
  providers: [
    PatrimonioService,
    { provide: 'tokenUrl', useValue: environment.tokenUrl },
    { provide: 'patrimonioUrl', useValue: environment.patrimonioUrl },
  ],
})
export class PatrimonioModule {}
