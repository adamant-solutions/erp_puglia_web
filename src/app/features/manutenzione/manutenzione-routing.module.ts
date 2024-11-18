import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManutenzioneComponent} from './manutenzione.component';

const routes: Routes = [{path: '', component: ManutenzioneComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManutenzioneRoutingModule {
}
