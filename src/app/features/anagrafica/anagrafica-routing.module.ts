import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaComponent } from './anagrafica.component';
import {
  anagraficaByIdResolver,
  anagraficaResolver,
} from 'src/app/core/resolvers/anagrafica.resolver';
import { ViewAnagraficaComponent } from './view-anagrafica/view-anagrafica.component';
import { AddAnagraficaComponent } from './add-anagrafica/add-anagrafica.component';
import { EditAnagraficaComponent } from './edit-anagrafica/edit-anagrafica.component';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaComponent,
    resolve: { anagraficaResolver: anagraficaResolver },
      runGuardsAndResolvers: 'always'
  },
  {
    path: 'anagrafica-dettagli/:anagraficaId',
    component: ViewAnagraficaComponent,
    resolve: { anagraficaByIdResolver },
  },
  {
    path: 'nuova-anagrafica',
    component: AddAnagraficaComponent,
  },
  {
    path: 'modifica-anagrafica/:anagraficaId',
    component: EditAnagraficaComponent,
    resolve: { anagraficaByIdResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnagraficaRoutingModule {}
