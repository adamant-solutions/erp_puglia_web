import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewImpreseComponent } from './view-imprese/view-imprese.component';
import { impreseByIdResolver, impreseResolver } from 'src/app/core/resolvers/manutenzione-resolvers/imprese.resolver';
import { AddImpreseComponent } from './add-imprese/add-imprese.component';
import { EditImpreseComponent } from './edit-imprese/edit-imprese.component';
import { DettagliImpreseComponent } from './dettagli-imprese/dettagli-imprese.component';

const routes: Routes = [
  {
    path: '',
    component: ViewImpreseComponent,
    resolve: { impreseResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'nuova-imprese',
    component: AddImpreseComponent
  },
  {
    path: 'imprese-dettagli/:id',
    component: DettagliImpreseComponent,
    resolve: { data: impreseByIdResolver }
  },
  {
    path: 'modifica-imprese/:id',
    component: EditImpreseComponent,
    resolve: { data: impreseByIdResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpreseRoutingModule { }
