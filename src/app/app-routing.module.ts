import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'anagrafica', pathMatch: 'full' },
  {
    path: 'anagrafica',
    loadChildren: () =>
      import('./features/anagrafica/anagrafica.module').then(
        (m) => m.AnagraficaModule
      ),
  },
  {
    path: 'patrimonio',
    loadChildren: () =>
      import('./features/patrimonio/patrimonio.module').then(
        (m) => m.PatrimonioModule
      ),
  },
  {
    path: 'contratti-locazione',
    loadChildren: () =>
      import('./features/contratti-locazione/contratti-locazione.module').then(
        (m) => m.ContrattiLocazioneModule
      ),
  },
  {
    path: 'manutenzione',
    loadChildren: () =>
      import('./features/manutenzione/manutenzione.module').then(
        (m) => m.ManutenzioneModule
      ),
  },
  {
    path: 'ripartizione-spese',
    loadChildren: () =>
      import('./features/ripartizione-spese/ripartizione-spese.module').then(
        (m) => m.RipartizioneSpeseModule
      ),
  },
  {
    path: 'morosita',
    loadChildren: () =>
      import('./features/morosita/morosita.module').then(
        (m) => m.MorositaModule
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
    path: 'ciclo-passivo',
    loadChildren: () =>
      import('./features/ciclo-passivo/ciclo-passivo.module').then(
        (m) => m.CicloPassivoModule
      ),
  },
  { path: '**', redirectTo: 'anagrafica' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
