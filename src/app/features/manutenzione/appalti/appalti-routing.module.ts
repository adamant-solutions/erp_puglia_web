import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppaltiComponent } from './view-appalti/view-appalti.component';


const routes: Routes = [
  {
    path: '',
    component: ViewAppaltiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppaltiRoutingModule { }
