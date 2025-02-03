import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MorositaRoutingModule} from './morosita-routing.module';
import {MorositaComponent} from './morosita.component';
import { ViewMorositaComponent } from './view-morosita/view-morosita.component';
import { EditMorositaComponent } from './edit-morosita/edit-morosita.component';
import { AddMorositaComponent } from './add-morosita/add-morosita.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    MorositaComponent,
    ViewMorositaComponent,
    EditMorositaComponent,
    AddMorositaComponent
  ],
  imports: [
    CommonModule,
    MorositaRoutingModule,
    SharedModule
]
})
export class MorositaModule {
}
