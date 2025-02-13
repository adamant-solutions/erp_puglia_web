import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodiListComponent } from './periodi-gestione-list/periodi-gestione-list.component';
import { periodiAllResolver } from 'src/app/core/resolvers/ripartizione-spese/periodi-gestione.resolver';

const routes: Routes = [
{path:'',
  component:PeriodiListComponent,
  resolve:{
    periodiAllResolver
  },runGuardsAndResolvers:'always'
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodiGestioneRoutingModule { }
