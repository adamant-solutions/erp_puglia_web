import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CicloPassivoComponent } from './ciclo-passivo.component';

const routes: Routes = [{ path: '', component: CicloPassivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CicloPassivoRoutingModule { }
