import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatoPagamentiListComponent } from './stato-pagamenti-list/stato-pagamenti-list.component';
import { statoPagamentiResolver } from 'src/app/core/resolvers/ripartizione-spese/stato-pagamenti.resolver';

const routes: Routes = [
  {
    path: '',
    component: StatoPagamentiListComponent,
    resolve: { pagamenti: statoPagamentiResolver},
    runGuardsAndResolvers: 'always'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatoPagamentiRoutingModule { }
