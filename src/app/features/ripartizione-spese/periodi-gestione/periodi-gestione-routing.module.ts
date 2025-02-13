import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodiListComponent } from './periodi-gestione-list/periodi-gestione-list.component';
import { condominiLightResolver, periodiAllResolver } from 'src/app/core/resolvers/ripartizione-spese/periodi-gestione.resolver';
import { AddPeriodoGestioneComponent } from './add-preiodi-gestione/add-periodi-gestione.component';

const routes: Routes = [
{path:'',
  component:PeriodiListComponent,
  resolve:{
    periodiAllResolver
  },runGuardsAndResolvers:'always'
},
{
  path: 'nuovo-periodo',
  component: AddPeriodoGestioneComponent,
  resolve: {
    condomini: condominiLightResolver
  }
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodiGestioneRoutingModule { }
