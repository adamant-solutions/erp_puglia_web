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
import { EditSollecitiComponent } from './solleciti/edit-solleciti/edit-solleciti.component';
import { AddSollecitiComponent } from './solleciti/add-solleciti/add-solleciti.component';
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
        path: 'solleciti/add',  
        component: AddSollecitiComponent
      },
      {
        path: 'solleciti/:sollecitoId/visualizza',
        component: ViewSollecitiComponent,
        resolve: {
          sollecitiResolver
        }
      },
      {
        path: 'solleciti/:sollecitoId/modifica',
        component: EditSollecitiComponent,
        resolve: {
          sollecito: sollecitiResolver
        }
      }
    ]
  },
  {
    path: 'edit-morosita/:id',
    children: [  
      {
        path: '',
        component: EditMorositaComponent,
        resolve: {
          morositaByIdResolver
        }
      },
      {
        path: 'solleciti',
        component: SollecitiComponent,
        resolve: {
          sollecitiResolver
        }
      },
      {
        path: 'solleciti/:sollecitoId/add',  
        component: AddSollecitiComponent
      },
      {
        path: 'solleciti/:sollecitoId/visualizza',
        component: ViewSollecitiComponent,
        resolve: {
          sollecitiResolver
        }
      },
      {
        path: 'solleciti/:sollecitoId/modifica',
        component: EditSollecitiComponent,
        resolve: {
          sollecito: sollecitiResolver
        }
      }
    ]
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
