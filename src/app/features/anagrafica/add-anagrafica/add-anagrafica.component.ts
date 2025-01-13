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
import { TipoDocumento } from 'src/app/core/models/anagrafica.model';
import * as moment from 'moment';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';

@Component({
  selector: 'app-add-anagrafica',
  templateUrl: './add-anagrafica.component.html',
  styleUrls: ['./add-anagrafica.component.css'],
})
export class AddAnagraficaComponent implements OnInit {
  pageTitle: string = 'Nuova Anagrafica';
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  hasUploadedFile = false;
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  addForm!: FormGroup;
  documentTypes: TipoDocumento[] = [
    TipoDocumento.CARTA_DEL_IDENTITA,
    TipoDocumento.PASSAPORTO,
    TipoDocumento.PATENTE,
  ];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private anagraficaService: AnagraficaService,
     private bootstrapService: BootstrapService
  ) {this.uploadForm = this.formBuilder.group({
    documentType: ['', Validators.required]
  });}

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
          comune: ['', Validators.required],
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

    this.documentiIdentita?.controls.forEach((control, index) => {
      console.log(
        `Data emissione for document ${index + 1}:`,
        control.get('data_emissione')?.value
      );
      console.log(
        `Data scadenza for document ${index + 1}:`,
        control.get('data_scadenza')?.value
      );
    });

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
  openUploadModal() {
    this.uploadForm.reset();
    this.selectedFile = null;
    this.bootstrapService.showModal('uploadModal');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveDocument() {
    if (this.uploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('type', this.uploadForm.get('documentType')?.value);

      this.hasUploadedFile = true;
      this.bootstrapService.hideModal('uploadModal');
    }
  }

  removeFile() {
    this.hasUploadedFile = false;
    this.selectedFile = null;
  }


}
