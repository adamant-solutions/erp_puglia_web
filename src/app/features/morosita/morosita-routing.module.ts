import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MorositaComponent} from './morosita.component';
import {  contrattiLightResolver, morositaByIdResolver, morositaResolver } from 'src/app/core/resolvers/morosita.resolver';
import { ViewMorositaComponent } from './view-morosita/view-morosita.component';
import { EditMorositaComponent } from './edit-morosita/edit-morosita.component';
import { AddMorositaComponent } from './add-morosita/add-morosita.component';
import { ViewSollecitiComponent } from './solleciti/view-solleciti/view-solleciti.component';
import { SollecitiComponent } from './solleciti/solleciti/solleciti.component';
import { sollecitiResolver } from 'src/app/core/resolvers/sollecito.resolver';
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
    path: 'view-morosita/:id',
    children: [
      {
        path: '',
        component: ViewMorositaComponent,
        resolve: {
          morositaByIdResolver
        },
      },
      {
        path: 'solleciti',
        component: SollecitiComponent,
        resolve: {
          sollecitiResolver
        }
      },
      {
        path: 'solleciti/:sollecitoId',
        component: ViewSollecitiComponent,
        resolve: {
          sollecitiResolver
        }
      }
    ]
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
