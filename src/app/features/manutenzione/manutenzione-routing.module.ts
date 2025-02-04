import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManutenzioneComponent} from './manutenzione.component';

const routes: Routes = [
  {
  path: '', component: ManutenzioneComponent
  },
  {
    path: 'imprese',
    loadChildren: () =>
      import('./imprese/imprese.module').then(
        (m) => m.ImpreseModule
      ),
  },
  {
    path: 'piani',
    loadChildren: () =>
      import('./piani/piani.module').then(
        (m) => m.PianiModule
      ),
  },
  {
    path: 'appalti',
    loadChildren: () =>
      import('./appalti/appalti.module').then(
        (m) => m.AppaltiModule
      ),
  },
  {
    path: 'interventi',
    loadChildren: () =>
      import('./interventi/interventi.module').then(
        (m) => m.InterventiModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManutenzioneRoutingModule {
}
