import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaComponent } from './anagrafica.component';
import {
  anagraficaByIdResolver,
  anagraficaResolver,
} from 'src/app/core/resolvers/anagrafica.resolver';
import { ViewAnagraficaComponent } from './view-anagrafica/view-anagrafica.component';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaComponent,
    resolve: { anagraficaResolver: anagraficaResolver },
  },
  {
    path: 'anagrafica-dettagli/:anagraficaId',
    component: ViewAnagraficaComponent,
    resolve: { anagraficaByIdResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnagraficaRoutingModule {}
