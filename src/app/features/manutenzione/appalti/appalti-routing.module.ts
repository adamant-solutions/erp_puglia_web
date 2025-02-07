import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppaltiComponent } from './view-appalti/view-appalti.component';
import { appaltoByIdResolver, appaltiResolver } from 'src/app/core/resolvers/manutenzione-resolvers/appalti.resolver';
import { AddAppaltiComponent } from './add-appalti/add-appalti.component';
import { DettagliAppaltiComponent } from './dettagli-appalti/dettagli-appalti.component';
import { EditAppaltiComponent } from './edit-appalti/edit-appalti.component';
import { impreseLightResolver } from 'src/app/core/resolvers/manutenzione-resolvers/imprese.resolver';
import { pianiLightResolver } from 'src/app/core/resolvers/manutenzione-resolvers/piani.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewAppaltiComponent,
    resolve: { appaltiResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'nuovo-appalto',
    component: AddAppaltiComponent,
    resolve: { dataPiano: pianiLightResolver }
  },
  {
    path: 'appalto-dettagli/:id',
    component: DettagliAppaltiComponent,
    resolve: { data: appaltoByIdResolver, dataImprese: impreseLightResolver }
  },
  {
    path: 'modifica-appalto/:id',
    component: EditAppaltiComponent,
    resolve: { data: appaltoByIdResolver, dataImprese: impreseLightResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppaltiRoutingModule { }
