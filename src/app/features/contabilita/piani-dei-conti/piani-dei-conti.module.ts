import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PianiDeiContiRoutingModule } from './piani-dei-conti-routing.module';
import { PianiContiListComponent } from './piani-conti-list/piani-conti-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPianoContiComponent } from './add-piano-conti/add-piano-conti.component';
import { DettagliPianoComponent } from './dettagli-piano/dettagli-piano.component';
import { EditPianoComponent } from './edit-piano/edit-piano.component';


@NgModule({
  declarations: [
    PianiContiListComponent,
    AddPianoContiComponent,
    DettagliPianoComponent,
    EditPianoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PianiDeiContiRoutingModule
  ]
})
export class PianiDeiContiModule { }
