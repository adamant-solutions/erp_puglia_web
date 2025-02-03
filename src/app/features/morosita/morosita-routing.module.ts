import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MorositaComponent} from './morosita.component';
import { morositaResolver } from 'src/app/core/resolvers/morosita.resolver';
const routes:Routes = [
  {
     path: '',
     component: MorositaComponent,
     resolve: {
       morositaResolver,
       
     },
     runGuardsAndResolvers: 'always',
   },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorositaRoutingModule {


}
