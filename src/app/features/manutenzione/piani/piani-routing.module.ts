import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPianiComponent } from './view-piani/view-piani.component';
import { pianiResolver } from 'src/app/core/resolvers/manutenzione-resolvers/piani.resolver';


const routes: Routes = [
  {
    path: '',
    component: ViewPianiComponent,
    resolve: { pianiResolver },
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianiRoutingModule { }
