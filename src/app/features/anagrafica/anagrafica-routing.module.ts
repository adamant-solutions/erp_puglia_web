import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaComponent } from './anagrafica.component';
import { anagraficaResolver } from 'src/app/core/resolvers/anagrafica.resolver';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaComponent,
    resolve: { anagraficaResolver: anagraficaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnagraficaRoutingModule {}
