import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { registrazioniContabileByContrattoResolver, registrazioniContabileResolver, registrazioniContabileSituazioneCreditiResolver } from 'src/app/core/resolvers/contabilita-resolvers/registrazioni-contabile.resolver';
import { contrattiLightResolver } from 'src/app/core/resolvers/morosita.resolver';
import { AddRegistrazioneComponent } from './add-registrazione/add-registrazione.component';
import { pianoDeiContiparentResolver } from 'src/app/core/resolvers/contabilita-resolvers/piano-dei-conti.resolver';
import { ContrattiListComponent } from './contratti-list/contratti-list.component';
import { SituazioneCreditiComponent } from './situazione-crediti/situazione-crediti.component';

const routes: Routes = [{
  path: '',
  component: ContrattiListComponent,
  resolve: { data: contrattiLightResolver},
  runGuardsAndResolvers: 'always',
},{
  path: ':id/registrazioni',
  component: RegistrazioniComponent,
  resolve: { data: registrazioniContabileByContrattoResolver , contrattiLightResolver},
  runGuardsAndResolvers: 'always',
},{
  path: ':id/registrazioni/nuova-registrazione',
  component: AddRegistrazioneComponent,
  resolve: { contrattiLightResolver,pianoDeiContiparentResolver},
},{
  path: ':id/situazione-crediti',
  component: SituazioneCreditiComponent,
  resolve: { data: registrazioniContabileSituazioneCreditiResolver },
  runGuardsAndResolvers: 'always',
},];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilitaContrattiRoutingModule { }
