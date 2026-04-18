import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UtentiListComponent } from './utenti-list.component';
import { UtenteFormComponent } from './utente-form.component';

const routes: Routes = [
  { path: '', component: UtentiListComponent },
  { path: 'new', component: UtenteFormComponent },
  { path: ':id', component: UtenteFormComponent }
];

@NgModule({
  declarations: [UtentiListComponent, UtenteFormComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class UtentiModule {}
