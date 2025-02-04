import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInterventiComponent } from './view-interventi/view-interventi.component';

const routes: Routes = [
  {
    path: '',
    component: ViewInterventiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventiRoutingModule { }
