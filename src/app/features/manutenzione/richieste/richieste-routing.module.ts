import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRichiesteComponent } from './view-richieste/view-richieste.component';
import { richiesteResolver } from 'src/app/core/resolvers/manutenzione-resolvers/richieste.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewRichiesteComponent,
    resolve: { richiesteResolver },
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RichiesteRoutingModule { }
