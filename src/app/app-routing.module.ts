import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'patrimonio', pathMatch: 'full' },
  {
    path: 'patrimonio',
    loadChildren: () =>
      import('./features/patrimonio/patrimonio.module').then(
        (m) => m.PatrimonioModule
      ),
  },
  {
    path: 'contabilita',
    loadChildren: () =>
      import('./features/contabilita/contabilita.module').then(
        (m) => m.ContabilitaModule
      ),
  },
  {
    path: 'anagrafica',
    loadChildren: () =>
      import('./features/anagrafica/anagrafica.module').then(
        (m) => m.AnagraficaModule
      ),
  },
  { path: '**', redirectTo: 'patrimonio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
