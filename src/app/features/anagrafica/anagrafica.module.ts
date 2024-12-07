import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnagraficaRoutingModule } from './anagrafica-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AnagraficaComponent } from './anagrafica.component';
import { ViewAnagraficaComponent } from './view-anagrafica/view-anagrafica.component';
import { AddAnagraficaComponent } from './add-anagrafica/add-anagrafica.component';
import { EditAnagraficaComponent } from './edit-anagrafica/edit-anagrafica.component';

import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AnagraficaComponent,
    ViewAnagraficaComponent,
    AddAnagraficaComponent,
    EditAnagraficaComponent,
  ],
  imports: [
    CommonModule,
    AnagraficaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    AnagraficaService,
    { provide: 'anagraficaUrl', useValue: environment.anagraficaUrl },
    MatNativeDateModule,
  ],
})
export class AnagraficaModule {}
