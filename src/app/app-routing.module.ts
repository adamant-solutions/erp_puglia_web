import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'anagrafica', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'utenti',
    canActivate: [authGuard, roleGuard('ADMIN')],
    loadChildren: () =>
      import('./features/utenti/utenti.module').then((m) => m.UtentiModule),
  },
  {
    path: 'anagrafica',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/anagrafica/anagrafica.module').then(
        (m) => m.AnagraficaModule
      ),
  },
  {
    path: 'patrimonio',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/patrimonio/patrimonio.module').then(
        (m) => m.PatrimonioModule
      ),
  },
  {
    path: 'contratti-locazione',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/contratti-locazione/contratti-locazione.module').then(
        (m) => m.ContrattiLocazioneModule
      ),
  },
  {
    path: 'manutenzione',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/manutenzione/manutenzione.module').then(
        (m) => m.ManutenzioneModule
      ),
  },
  {
    path: 'ripartizione-spese',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/ripartizione-spese/ripartizione-spese.module').then(
        (m) => m.RipartizioneSpeseModule
      ),
  },
  {
    path: 'morosita',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/morosita/morosita.module').then(
        (m) => m.MorositaModule
      ),
  },
  {
    path: 'contabilita',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/contabilita/contabilita.module').then(
        (m) => m.ContabilitaModule
      ),
  },
  {
    path: 'ciclo-passivo',
    canActivate: [authGuard],
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
