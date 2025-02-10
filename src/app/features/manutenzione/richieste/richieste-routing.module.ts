import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRichiesteComponent } from './view-richieste/view-richieste.component';
import { DettagliRichiestaComponent } from './dettagli-richiesta/dettagli-richiesta.component';
import { EditRichiesteComponent } from './edit-richieste/edit-richieste.component';
import { richiesteByIdResolver, richiesteResolver } from 'src/app/core/resolvers/manutenzione-resolvers/richieste.resolver';
import { intestatariResolver, unitaImmobiliareResolver } from 'src/app/core/resolvers/contratti.resolver';
import { appaltiLightResolver } from 'src/app/core/resolvers/manutenzione-resolvers/appalti.resolver';
import { pianiLightResolver } from 'src/app/core/resolvers/manutenzione-resolvers/piani.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewRichiesteComponent,
    resolve: { data: richiesteResolver },
    runGuardsAndResolvers: 'always',
  },
 /*  {
    path: 'nuova-richiesta',
    component: DettagliRichiestaComponent,//AddPianiComponent
  }, */
  {
    path: 'richiesta-dettagli/:id',
    component: DettagliRichiestaComponent,
    resolve: { data: richiesteByIdResolver , unitaData: unitaImmobiliareResolver , richiedenteData: intestatariResolver , appaltiData: appaltiLightResolver , pianiData: pianiLightResolver},
    runGuardsAndResolvers: 'always',
  },
   {
    path: 'modifica-richiesta/:id',
    component: EditRichiesteComponent,
    resolve: { data: richiesteByIdResolver, unitaData: unitaImmobiliareResolver , richiedenteData: intestatariResolver , appaltiData: appaltiLightResolver , pianiData: pianiLightResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RichiesteRoutingModule { }
