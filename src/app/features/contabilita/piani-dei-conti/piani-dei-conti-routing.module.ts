import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PianiContiListComponent } from './piani-conti-list/piani-conti-list.component';
import { pianoDeiContiparentResolver, pianoDeiContiResolver } from 'src/app/core/resolvers/contabilita-resolvers/piano-dei-conti.resolver';
import { AddPianoContiComponent } from './add-piano-conti/add-piano-conti.component';

const routes: Routes = [{
  path: '',
  component: PianiContiListComponent,
  resolve: { data: pianoDeiContiparentResolver},
  runGuardsAndResolvers: 'always',
},
{
  path: 'nuovo-piano-di-conti',
  component: AddPianoContiComponent,
  resolve: { allPiani: pianoDeiContiResolver }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianiDeiContiRoutingModule { }
