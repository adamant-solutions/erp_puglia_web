import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatrimonioComponent } from './patrimonio.component';
import {
  patrimonioResolver,
  patrimonioByIdResolver,
} from 'src/app/core/resolvers/patrimonio.resolver';
import { ViewPatrimonioComponent } from './view-patrimonio/view-patrimonio.component';
import { AddPatrimonioComponent } from './add-patrimonio/add-patrimonio.component';
import { EditPatrimonioComponent } from './edit-patrimonio/edit-patrimonio.component';

const routes: Routes = [
  {
    path: '',
    component: PatrimonioComponent,
    resolve: { patrimonioResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'patrimonio-dettagli/:patrimonioId',
    component: ViewPatrimonioComponent,
    resolve: { patrimonioByIdResolver },
  },
  {
    path: 'nuovo-patrimonio',
    component: AddPatrimonioComponent,
  },
  {
    path: 'modifica-patrimonio/:patrimonioId',
    component: EditPatrimonioComponent,
    resolve: { patrimonioByIdResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatrimonioRoutingModule {}
