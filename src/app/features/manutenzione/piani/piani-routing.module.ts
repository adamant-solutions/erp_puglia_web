import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPianiComponent } from './view-piani/view-piani.component';
import { pianiByIdResolver, pianiResolver } from 'src/app/core/resolvers/manutenzione-resolvers/piani.resolver';
import { AddPianiComponent } from './add-piani/add-piani.component';
import { DettagliPianiComponent } from './dettagli-piani/dettagli-piani.component';
import { EditPianiComponent } from './edit-piani/edit-piani.component';


const routes: Routes = [
  {
    path: '',
    component: ViewPianiComponent,
    resolve: { pianiResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'nuovo-piano',
    component: AddPianiComponent
  },
  {
    path: 'piano-dettagli/:id',
    component: DettagliPianiComponent,
    resolve: { data: pianiByIdResolver }
  },
  {
    path: 'modifica-piano/:id',
    component: EditPianiComponent,
    resolve: { data: pianiByIdResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianiRoutingModule { }
