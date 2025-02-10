import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominiListComponent } from './condomini-list/condomini-list.component';
import { condominiAllResolver } from 'src/app/core/resolvers/ripartizione-spese/condominio.resolver';


const routes: Routes = [
  {
    path: '',
    component: CondominiListComponent,
    resolve: {
      condomini: condominiAllResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondominiRoutingModule { }
