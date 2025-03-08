import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PianiContiListComponent } from './piani-conti-list/piani-conti-list.component';
import { pianoDeiContiByIDparentCodiceResolver , pianoDeiContiparentResolver, pianoDeiContiResolver } from 'src/app/core/resolvers/contabilita-resolvers/piano-dei-conti.resolver';
import { AddPianoContiComponent } from './add-piano-conti/add-piano-conti.component';
import { DettagliPianoComponent } from './dettagli-piano/dettagli-piano.component';
import { EditPianoComponent } from './edit-piano/edit-piano.component';

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
},
{
  path: 'dettagli/:id',
  component: DettagliPianoComponent,
  resolve: { piani: pianoDeiContiByIDparentCodiceResolver }
},
{
  path: 'modifica/:id',
  component: EditPianoComponent,
  resolve: { piano: pianoDeiContiByIDparentCodiceResolver ,allPiani: pianoDeiContiResolver }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianiDeiContiRoutingModule { }
