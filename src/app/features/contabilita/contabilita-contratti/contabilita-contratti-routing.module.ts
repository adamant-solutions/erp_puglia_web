import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { registrazioniContabileResolver } from 'src/app/core/resolvers/contabilita-resolvers/registrazioni-contabile.resolver';
import { contrattiLightResolver } from 'src/app/core/resolvers/morosita.resolver';
import { AddRegistrazioneComponent } from './add-registrazione/add-registrazione.component';
import { pianoDeiContiparentResolver } from 'src/app/core/resolvers/contabilita-resolvers/piano-dei-conti.resolver';

const routes: Routes = [{
  path: '',
  component: RegistrazioniComponent,
  resolve: { data: registrazioniContabileResolver , contrattiLightResolver},
  runGuardsAndResolvers: 'always',
},{
  path: 'nuova-registrazione',
  component: AddRegistrazioneComponent,
  resolve: { contrattiLightResolver,pianoDeiContiparentResolver},
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilitaContrattiRoutingModule { }
