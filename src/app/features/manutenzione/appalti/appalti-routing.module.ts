import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppaltiComponent } from './view-appalti/view-appalti.component';
import { appaltiResolver } from 'src/app/core/resolvers/manutenzione-resolvers/appalti.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewAppaltiComponent,
    resolve: { appaltiResolver },
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppaltiRoutingModule { }
