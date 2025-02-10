import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatoPagamentiListComponent } from './stato-pagamenti-list/stato-pagamenti-list.component';

const routes: Routes = [
{path:'',
  component:StatoPagamentiListComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatoPagamentiRoutingModule { }
