import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';

@Component({
  selector: 'app-add-anagrafica',
  templateUrl: './add-anagrafica.component.html',
  styleUrls: ['./add-anagrafica.component.css'],
})
export class AddAnagraficaComponent implements OnInit {
  pageTitle: string = 'Nuova Anagrafica';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  anagrafica!: Anagrafica;
  addForm!: FormGroup;
  formattedDate: string | null = null;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private anagraficaService: AnagraficaService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onDateChange(event: any): void {
    const selectedDate = event.value; // This is a JavaScript Date object
    console.log('Selected Date:', selectedDate);

    // Format the date for display as dd/MM/yyyy
    this.formattedDate = this.datePipe.transform(selectedDate, 'dd/MM/yyyy');
    console.log('Formatted date for display:', this.formattedDate);

    // Set the raw value in yyyy-MM-dd format in the form
    const isoFormattedDate = this.datePipe.transform(
      selectedDate,
      'yyyy-MM-dd'
    );
    this.addForm.get('cittadino.dataDiNascita')?.setValue(isoFormattedDate);
  }

  /*
  onDateChange(value: string): void {
    console.log('Selected date (yyyy-MM-dd):', value); // default format of HTML's native date input type (yyyy-MM-dd)

    // Convert the date to dd/MM/yyyy for display
    const formattedDate = this.datePipe.transform(value, 'dd/MM/yyyy');
    console.log('Formatted date for display (dd/MM/yyyy):', formattedDate);
  }
  */

  initForm() {
    this.addForm = this.formBuilder.group({
      id: [-1],

      cittadino: this.formBuilder.group({
        // id: [],

        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        codiceFiscale: ['', Validators.required],
        genere: ['', Validators.required],
        cittadinanza: ['', Validators.required],
        dataDiNascita: [''],

        residenza: this.formBuilder.group({
          indirizzo: [''],
          civico: [''],
          cap: [''],
          comuneResidenza: [''],
          provinciaResidenza: [''],
          statoResidenza: [''],
        }),
        contatti: this.formBuilder.group({
          telefono: [''],
          cellulare: [''],
          email: [''],
          pec: [''],
        }),
        luogo_nascita: this.formBuilder.group({
          comune: [''],
          provincia: [''],
          stato: [''],
        }),
      }),
    });
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  resetForm() {
    this.addForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    console.log('Form controls:', this.addForm.controls);
    console.log('Form data:', this.addForm.value);

    if (this.addForm.invalid) {
      return;
    } else {
      // Prepare the data for backend submission
      /*
      const rawValue = this.addForm.getRawValue();
      const dataDiNascita = rawValue.cittadino.dataDiNascita;
      rawValue.cittadino.dataDiNascita = this.datePipe.transform(
        dataDiNascita,
        'yyyy-MM-dd'
      );
      */

      this.anagraficaService
        .addAnagrafica(this.addForm.getRawValue())
        .subscribe({
          next: (data: any) => {
            console.log('Form data (response):', data);
            this.addForm.reset();
            this.submitted = false;
            this.router.navigate(['/anagrafica']);
          },
          error: (error: any) => {
            console.error('An error occurred while adding anagrafica:', error);
          },
        });
    }
  }
}
