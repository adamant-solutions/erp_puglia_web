import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PianiContiListComponent } from './piani-conti-list/piani-conti-list.component';
import { pianoDeiContiparentResolver } from 'src/app/core/resolvers/contabilita-resolvers/piano-dei-conti.resolver';

const routes: Routes = [{
  path: '',
  component: PianiContiListComponent,
  resolve: { data: pianoDeiContiparentResolver},
  runGuardsAndResolvers: 'always',
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianiDeiContiRoutingModule { }
