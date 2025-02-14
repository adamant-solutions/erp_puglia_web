import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodiListComponent } from './periodi-gestione-list/periodi-gestione-list.component';
import { condominiLightResolver, periodiAllResolver, periodoByIdResolver, periodoResolver } from 'src/app/core/resolvers/ripartizione-spese/periodi-gestione.resolver';
import { AddPeriodoGestioneComponent } from './add-periodi-gestione/add-periodi-gestione.component';
import { ViewPeriodiGestioneComponent } from './view-periodi-gestione/view-periodi-gestione.component';

const routes: Routes = [
{path:'',
  component:PeriodiListComponent,
  resolve:{
    
    periodoResolver
  },runGuardsAndResolvers:'always'
},
{
  path: 'nuovo-periodo',
  component: AddPeriodoGestioneComponent,
  resolve: {
    condomini: condominiLightResolver
  },
  
},
{
  path: 'periodo-dettagli/:id',
  component: ViewPeriodiGestioneComponent,
  resolve: {
    periodo: periodoByIdResolver,
    condomini: condominiLightResolver
  }
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodiGestioneRoutingModule { }
