import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPianiComponent } from './view-piani/view-piani.component';


const routes: Routes = [
  {
    path: '',
    component: ViewPianiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianiRoutingModule { }
