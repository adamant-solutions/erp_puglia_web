import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RipartizioneSpeseComponent } from './ripartizione-spese.component';

const routes: Routes = [{ path: '', component: RipartizioneSpeseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RipartizioneSpeseRoutingModule { }
