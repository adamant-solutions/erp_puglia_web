import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MorositaRoutingModule} from './morosita-routing.module';
import {MorositaComponent} from './morosita.component';
import { ViewMorositaComponent } from './view-morosita/view-morosita.component';
import { EditMorositaComponent } from './edit-morosita/edit-morosita.component';
import { AddMorositaComponent } from './add-morosita/add-morosita.component';
import { SharedModule } from "../../shared/shared.module";
import { ViewSollecitiComponent } from './solleciti/view-solleciti/view-solleciti.component';
import { SollecitiComponent } from './solleciti/solleciti/solleciti.component';
import { EditSollecitiComponent } from './solleciti/edit-solleciti/edit-solleciti.component';
import { AddSollecitiComponent } from './solleciti/add-solleciti/add-solleciti.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MorositaComponent,
    ViewMorositaComponent,
    EditMorositaComponent,
    AddMorositaComponent,
    ViewSollecitiComponent,
    SollecitiComponent,
    EditSollecitiComponent,
    AddSollecitiComponent,
    
  ],
  imports: [
    CommonModule,
    MorositaRoutingModule,
    SharedModule,
    FormsModule
]
})
export class MorositaModule {
}
