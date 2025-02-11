import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominiListComponent } from './condomini-list/condomini-list.component';
import {  condominioByIdResolver, condominioResolver } from 'src/app/core/resolvers/ripartizione-spese/condominio.resolver';
import { ViewCondominiComponent } from './view-condomini/view-condomini.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondominiRoutingModule { }
