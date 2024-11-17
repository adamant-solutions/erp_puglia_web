import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnagraficaComponent} from './anagrafica.component';

const routes: Routes = [{path: '', component: AnagraficaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnagraficaRoutingModule {
}
