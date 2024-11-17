import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContrattiLocazioneComponent} from './contratti-locazione.component';

const routes: Routes = [{path: '', component: ContrattiLocazioneComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContrattiLocazioneRoutingModule {
}
