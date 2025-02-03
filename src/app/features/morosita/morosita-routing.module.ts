import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MorositaComponent} from './morosita.component';
import { morositaByIdResolver, morositaResolver } from 'src/app/core/resolvers/morosita.resolver';
import { ViewMorositaComponent } from './view-morosita/view-morosita.component';
const routes:Routes = [
  {
     path: '',
     component: MorositaComponent,
     resolve: {
       morositaResolver,
       
     },
     runGuardsAndResolvers: 'always',
   },
   {
    path:'view-morosita/:id',
    component:ViewMorositaComponent,
    resolve: {
      morositaByIdResolver
    }
   
   }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorositaRoutingModule {


}
