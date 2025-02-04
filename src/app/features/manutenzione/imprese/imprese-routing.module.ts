import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewImpreseComponent } from './view-imprese/view-imprese.component';
import { impreseResolver } from 'src/app/core/resolvers/manutenzione-resolvers/imprese.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewImpreseComponent,
    resolve: { impreseResolver },
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpreseRoutingModule { }
