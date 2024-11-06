import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContabilitaComponent } from './contabilita.component';

const routes: Routes = [{ path: '', component: ContabilitaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilitaRoutingModule { }
