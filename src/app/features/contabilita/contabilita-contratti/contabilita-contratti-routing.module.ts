import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { registrazioniContabileByContrattoResolver, registrazioniContabileByIdResolver, registrazioniContabileSituazioneCreditiResolver } from 'src/app/core/resolvers/contabilita-resolvers/registrazioni-contabile.resolver';
import { contrattiLightResolver } from 'src/app/core/resolvers/morosita.resolver';
import { AddRegistrazioneComponent } from './add-registrazione/add-registrazione.component';
import { pianoDeiContiResolver } from 'src/app/core/resolvers/contabilita-resolvers/piano-dei-conti.resolver';
import { ContrattiListComponent } from './contratti-list/contratti-list.component';
import { SituazioneCreditiComponent } from './situazione-crediti/situazione-crediti.component';
import { AddPagamentiComponent } from './add-pagamenti/add-pagamenti.component';
import { EditRegistrazioneComponent } from './edit-registrazione/edit-registrazione.component';

const routes: Routes = [{
  path: '',
  component: ContrattiListComponent,
  resolve: { data: contrattiLightResolver },
  runGuardsAndResolvers: 'always',
}, {
  path: ':id/registrazioni',
  children: [
    {
      path: '',
      component: RegistrazioniComponent,
      resolve: { data: registrazioniContabileByContrattoResolver, contrattiLightResolver },
      runGuardsAndResolvers: 'always',
    },
    {
      path: 'nuova-registrazione',
      component: AddRegistrazioneComponent,
      resolve: { contrattiLightResolver, pianoDeiContiResolver },
    },
    {
      path: 'nuova-registrazione-pagamento',
      component: AddPagamentiComponent,
      resolve: { contrattiLightResolver, pianoDeiContiResolver  },
    },
     {
      path: ':registerId/modifica-registrazione',
      component: EditRegistrazioneComponent,
      resolve: { contrattiLightResolver,pianoDeiContiResolver, registrazioniContabileByIdResolver },
    },
    {
      path: ':registerId/visualizza-registrazione',
      component: EditRegistrazioneComponent,
      resolve: { contrattiLightResolver,pianoDeiContiResolver, registrazioniContabileByIdResolver },
    }
  ],

}
  , {
  path: ':id/situazione-crediti',
  component: SituazioneCreditiComponent,
  resolve: { data: registrazioniContabileSituazioneCreditiResolver },
  runGuardsAndResolvers: 'always',
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilitaContrattiRoutingModule { }
