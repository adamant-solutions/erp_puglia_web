import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VociSpesaListComponent } from './voci-spesa-list/voci-spesa-list.component';
import { periodiResolver, vociSpesaResolver } from 'src/app/core/resolvers/ripartizione-spese/voci-spesa.resolver';
import { AddVociSpesaComponent } from './add-voci-spesa/add-voci-spesa.component';

const routes: Routes = [
  {
    path: '',
    component: VociSpesaListComponent,
    resolve: {
      vociSpesa: vociSpesaResolver
    }
  },
  {
    path:'nuovo-voci-spesa',
    component:AddVociSpesaComponent,
    resolve: {
      periodi: periodiResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VociSpesaRoutingModule { }
