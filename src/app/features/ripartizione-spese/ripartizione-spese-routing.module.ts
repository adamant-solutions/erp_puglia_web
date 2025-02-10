import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RipartizioneSpeseComponent } from './ripartizione-spese.component';

const routes: Routes = [
  {
    path: '',
    component: RipartizioneSpeseComponent,
    children: [
      {
        path: 'voci-spesa',
        loadChildren: () => 
          import('./voci-spesa/voci-spesa.module').then(m => m.VociSpesaModule)
      },
      {
        path: 'stato-pagamenti',
        loadChildren: () => 
          import('./stato-pagamenti/stato-pagamenti.module').then(m => m.StatoPagamentiModule)
      },
      {
        path: 'periodi-gestione',
        loadChildren: () => 
          import('./periodi-gestione/periodi-gestione.module').then(m => m.PeriodiGestioneModule)
      },
      {
        path: 'condomini',
        loadChildren: () => 
          import('./condomini/condomini.module').then(m => m.CondominiModule)
      },
      {
        path: '',
        redirectTo: 'voci-spesa',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RipartizioneSpeseRoutingModule { }