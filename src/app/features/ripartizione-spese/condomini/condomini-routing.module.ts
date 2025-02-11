import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominiListComponent } from './condomini-list/condomini-list.component';
import {  condominioByIdResolver, condominioResolver } from 'src/app/core/resolvers/ripartizione-spese/condominio.resolver';
import { ViewCondominiComponent } from './view-condomini/view-condomini.component';
import { EditCondominiComponent } from './edit-condomini/edit-condomini.component';
import { unitaImmobiliareResolver } from 'src/app/core/resolvers/contratti.resolver';


const routes: Routes = [
  {
    path: '',
    component: CondominiListComponent,
    resolve: {
      condomini: condominioResolver,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'condominio-dettagli/:id',
    component: ViewCondominiComponent,
    resolve: {
      condominio: condominioByIdResolver
    }
  },
  {
    path: 'modifica-condominio/:id',
    component: EditCondominiComponent,
    resolve: {
      condominio: condominioByIdResolver,
      unitaImmobiliari: unitaImmobiliareResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondominiRoutingModule { }
