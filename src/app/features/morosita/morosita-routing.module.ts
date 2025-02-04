import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MorositaComponent} from './morosita.component';
import {  contrattiLightResolver, morositaByIdResolver, morositaResolver } from 'src/app/core/resolvers/morosita.resolver';
import { ViewMorositaComponent } from './view-morosita/view-morosita.component';
import { EditMorositaComponent } from './edit-morosita/edit-morosita.component';
import { AddMorositaComponent } from './add-morosita/add-morosita.component';
const routes:Routes = [
  {
     path: '',
     component: MorositaComponent,
     resolve: {
      morositaResolver,
      contrattiLightResolver
       
     },
     runGuardsAndResolvers: 'always',
   },
   {
    path:'view-morosita/:id',
    component:ViewMorositaComponent,
    resolve: {
      morositaByIdResolver
    }
   
   },
  {
    path:'edit-morosita/:id',
    component:EditMorositaComponent,
    resolve: {
      morositaByIdResolver
    }
  },
  {
    path:'add-morosita',
    component:AddMorositaComponent,
    resolve:{contratti:contrattiLightResolver}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorositaRoutingModule {


}
