import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContrattiLocazioneComponent } from './contratti-locazione.component';
import { AddContrattiComponent } from './add-contratti/add-contratti.component';
import { EditContrattiComponent } from './edit-contratti/edit-contratti.component';
import { ViewContrattiComponent } from './view-contratti/view-contratti.component';
import { 
  contrattiByIdResolver,
  contrattiResolver, 
  intestatariResolver, 
  unitaImmobiliareResolver,
  
} from 'src/app/core/resolvers/contratti.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContrattiLocazioneComponent,
    resolve: {
      contrattiResolver,
      unitaImmobiliareResolver
     
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'nuovo-contratto',
    component: AddContrattiComponent,
    resolve: {
      unitaImmobiliari: unitaImmobiliareResolver,
      intestatari: intestatariResolver
    }
  },
  {
    path: 'modifica-contratto/:id',
    component: EditContrattiComponent,
    resolve: {
      contratto: contrattiByIdResolver,
      unitaImmobiliari: unitaImmobiliareResolver,
      intestatari: intestatariResolver
    }
  },
  {
    path: 'contratto-dettagli/:id',
    component: ViewContrattiComponent,
    resolve: {
      contratto: contrattiByIdResolver,
      unitaImmobiliareResolver: unitaImmobiliareResolver,
      intestatariResolver: intestatariResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContrattiLocazioneRoutingModule { }