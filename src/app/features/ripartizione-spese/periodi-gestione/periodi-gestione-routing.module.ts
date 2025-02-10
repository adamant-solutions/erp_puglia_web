import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodiGestioneListComponent } from './periodi-gestione-list/periodi-gestione-list.component';

const routes: Routes = [
{path:'',
  component:PeriodiGestioneListComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodiGestioneRoutingModule { }
