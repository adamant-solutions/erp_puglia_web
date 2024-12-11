import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import * as moment from 'moment';

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

  addForm!: FormGroup;
  documentTypes = ["Carta d'Identità", 'Passaporto', 'Patente'];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private anagraficaService: AnagraficaService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      id: [-1],

      cittadino: this.formBuilder.group({
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        codiceFiscale: ['', Validators.required],
        genere: ['', Validators.required],
        cittadinanza: ['', Validators.required],
        dataDiNascita: ['', [Validators.required]], // this.dateValidator

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
        documenti_identita: this.formBuilder.array([]),
      }),
    });
  }

  get documentiIdentita(): FormArray {
    return this.addForm.get('cittadino.documenti_identita') as FormArray;
  }

  addDocumento(): void {
    const documentoGroup = this.formBuilder.group({
      tipo_documento: [''],
      numero_documento: [''],
      data_emissione: [''],
      data_scadenza: [''],
      ente_emittente: [''],
    });
    this.documentiIdentita.push(documentoGroup);
  }

  removeDocumento(index: number): void {
    this.documentiIdentita.removeAt(index);
  }

  // recheck
  /*
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const inputValue = control.value;
    const isValid = moment(inputValue, 'DD/MM/YYYY', true).isValid();
    return isValid ? null : { invalidDate: true };
  }
  */

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  resetForm() {
    this.addForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    // console.log('Form controls:', this.addForm.controls);
    console.log(
      'Form data before converting dataDiNascita:',
      this.addForm.value
    );
    console.log(
      'Data emissione:',
      this.documentiIdentita.at(0).get('data_emissione')?.value
    );
    console.log(
      'Data scadenza:',
      this.documentiIdentita.at(0).get('data_scadenza')?.value
    );

    let sendConvertedDataDiNascita = moment(
      this.addForm.value.cittadino.dataDiNascita
    ).format('YYYY-MM-DD');
    console.log('Converted dataDiNascita:', sendConvertedDataDiNascita);

    this.addForm.patchValue({
      cittadino: {
        dataDiNascita: sendConvertedDataDiNascita,
      },
    });
    console.log('Form data to be sent to BE:', this.addForm.value);

    if (this.addForm.invalid) {
      return;
    } else {
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
