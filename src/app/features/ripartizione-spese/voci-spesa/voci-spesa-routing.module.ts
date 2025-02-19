import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VociSpesaListComponent } from './voci-spesa-list/voci-spesa-list.component';
import { periodiResolver, voceSpesaResolverID, vociSpesaResolver } from 'src/app/core/resolvers/ripartizione-spese/voci-spesa.resolver';
import { AddVociSpesaComponent } from './add-voci-spesa/add-voci-spesa.component';
import { EditVociSpesaComponent } from './edit-voci-spesa/edit-voci-spesa.component';

const routes: Routes = [
  {
    path: '',
    component: VociSpesaListComponent,
    resolve: {
      vociSpesa: vociSpesaResolver,
      periodi: periodiResolver
    }, runGuardsAndResolvers:'always'
  },
  {
    path:'nuovo-voci-spesa',
    component:AddVociSpesaComponent,
    resolve: {
      periodi: periodiResolver
    }
  },
  {
    path: 'modifica/:id',
    component: EditVociSpesaComponent,
    resolve: {
      periodi: periodiResolver,
      voceSpesaResolverID
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VociSpesaRoutingModule { }
