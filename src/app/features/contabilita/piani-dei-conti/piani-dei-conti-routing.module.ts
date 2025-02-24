import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PianiContiListComponent } from './piani-conti-list/piani-conti-list.component';

const routes: Routes = [{
  path: '',
  component: PianiContiListComponent,
 // resolve: {  },
  runGuardsAndResolvers: 'always',
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianiDeiContiRoutingModule { }
