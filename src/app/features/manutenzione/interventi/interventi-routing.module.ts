import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInterventiComponent } from './view-interventi/view-interventi.component';
import { interventiResolver } from 'src/app/core/resolvers/manutenzione-resolvers/interventi.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewInterventiComponent,
    resolve: { interventiResolver },
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventiRoutingModule { }
