import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VociSpesaListComponent } from './voci-spesa-list/voci-spesa-list.component';
import { vociSpesaResolver } from 'src/app/core/resolvers/ripartizione-spese/voci-spesa.resolver';

const routes: Routes = [
  {
    path: '',
    component: VociSpesaListComponent,
    resolve: {
      vociSpesa: vociSpesaResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VociSpesaRoutingModule { }
