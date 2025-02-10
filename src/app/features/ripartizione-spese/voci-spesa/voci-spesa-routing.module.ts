import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VociSpesaListComponent } from './voci-spesa-list/voci-spesa-list.component';

const routes: Routes = [
{path:'',
  component:VociSpesaListComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VociSpesaRoutingModule { }
