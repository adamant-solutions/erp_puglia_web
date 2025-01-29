import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContrattiLocazioneComponent} from './contratti-locazione.component';
import { contrattiResolver, intestatariResolver, unitaImmobiliareResolver } from 'src/app/core/resolvers/contratti.resolver';

const routes: Routes = [{ path: '', component: ContrattiLocazioneComponent,
   resolve: { contrattiResolver, unitaImmobiliareResolver, intestatariResolver },
   runGuardsAndResolvers: 'always', }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContrattiLocazioneRoutingModule {
}
