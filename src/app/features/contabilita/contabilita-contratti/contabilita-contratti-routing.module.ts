import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioniComponent } from './registrazioni/registrazioni.component';
import { registrazioniContabileResolver } from 'src/app/core/resolvers/contabilita-resolvers/registrazioni-contabile.resolver';
import { contrattiLightResolver } from 'src/app/core/resolvers/morosita.resolver';

const routes: Routes = [{
  path: '',
  component: RegistrazioniComponent,
  resolve: { data: registrazioniContabileResolver , contrattiLightResolver},
  runGuardsAndResolvers: 'always',
},];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilitaContrattiRoutingModule { }
