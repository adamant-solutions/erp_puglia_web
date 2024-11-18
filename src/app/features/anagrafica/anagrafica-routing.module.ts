import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaComponent } from './anagrafica.component';
import { AnagraficaResolver } from 'src/app/core/resolvers/anagrafica.resolver';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaComponent,
    resolve: { anagraficaResolver: AnagraficaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnagraficaRoutingModule {}
