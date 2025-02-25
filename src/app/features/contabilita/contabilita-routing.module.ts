import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContabilitaComponent} from './contabilita.component';

const routes: Routes = [
  {path: '', component: ContabilitaComponent},
  {
    path: 'piano-dei-conti',
    loadChildren: () =>
      import('./piani-dei-conti/piani-dei-conti.module').then(
        (m) => m.PianiDeiContiModule
      ),
  },
  {
    path: 'contabilita-contratti',
    loadChildren: () =>
      import('./contabilita-contratti/contabilita-contratti.module').then(
        (m) => m.ContabilitaContrattiModule
      ),
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilitaRoutingModule {
}
