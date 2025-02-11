import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInterventiComponent } from './view-interventi/view-interventi.component';
import { interventiByIDResolver, interventiResolver } from 'src/app/core/resolvers/manutenzione-resolvers/interventi.resolver';
import { AddInterventiComponent } from './add-interventi/add-interventi.component';
import { DettagliInterventiComponent } from './dettagli-interventi/dettagli-interventi.component';
import { EditInterventiComponent } from './edit-interventi/edit-interventi.component';
import { richiesteLightResolver } from 'src/app/core/resolvers/manutenzione-resolvers/richieste.resolver';
import { impreseLightResolver } from 'src/app/core/resolvers/manutenzione-resolvers/imprese.resolver';
import { appaltiLightResolver } from 'src/app/core/resolvers/manutenzione-resolvers/appalti.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewInterventiComponent,
    resolve: { data: interventiResolver , dataRichieste: richiesteLightResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'nuovo-intervento',
    component: AddInterventiComponent,
    resolve: { richieste: richiesteLightResolver, appalti: appaltiLightResolver },
  },
  {
    path: 'interventi-dettagli/:id',
    component: DettagliInterventiComponent,
     resolve: { data: interventiByIDResolver , richieste: richiesteLightResolver, imprese: impreseLightResolver },
  },
  {
    path: 'modifica-interventi/:id',
    component: EditInterventiComponent,
    resolve: { data: interventiByIDResolver , richieste: richiesteLightResolver, imprese: impreseLightResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventiRoutingModule { }
