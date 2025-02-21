import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { CapitalizePipe } from '../core/pipes/capitalize.pipe';
import { NaPipe } from '../core/pipes/na.pipe';
import { EsitoFormatPipe } from '../core/pipes/esito-format.pipe';

// Angular Material

import { MatTooltipModule } from '@angular/material/tooltip';

// for Forms
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
// Moment
import {
  MatMomentDateModule,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

// paginator
import { MatPaginatorModule } from '@angular/material/paginator';

// Date format configuration
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Format for parsing user input (manual input)
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Format for displaying in the input field
    monthYearLabel: 'MMM YYYY', // Format for the month and year label in the calendar
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [BreadcrumbsComponent, CapitalizePipe, NaPipe, EsitoFormatPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,

    MatTooltipModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,

    BreadcrumbsComponent,

    CapitalizePipe,
    NaPipe,
    EsitoFormatPipe,
    MatTooltipModule,
  ],
  providers: [
    // Set default locale for date pickers to Italian
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    // Define custom date formats for parsing and display
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    // Enable strict parsing to ensure valid date inputs
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
    // Configure Moment.js as the date adapter with locale and parsing options
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    CapitalizePipe,
  ],
})
export class SharedModule {}
