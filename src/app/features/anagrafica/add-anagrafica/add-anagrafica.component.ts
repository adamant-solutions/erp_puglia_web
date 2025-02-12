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
type UploadDocumentType = 'CI' | 'PP' | 'PT';
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
  selectedFiles: { [index: number]: File } = {};
  displayFileNames: { [index: number]: string } = {};
  currentDocumentIndex: number = -1;
  errorMessage = '';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  private documentTypeMap: Record<TipoDocumento, UploadDocumentType> = {
    [TipoDocumento.CARTA_DEL_IDENTITA]: 'CI',
    [TipoDocumento.PASSAPORTO]: 'PP',
    [TipoDocumento.PATENTE]: 'PT',
  };

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
  ) {
    this.uploadForm = this.formBuilder.group({
      documentType: ['', Validators.required],
    });
  }

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
        dataDiNascita: ['', [Validators.required]],

        residenza: this.formBuilder.group({
          indirizzo: [''],
          civico: [''],
          cap: ['', [Validators.pattern('^[0-9]{5}$')]],
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
      tipo_documento: ['', Validators.required],
      numero_documento: ['', Validators.required],
      data_emissione: ['', Validators.required],
      data_scadenza: ['', Validators.required],
      ente_emittente: ['', Validators.required],
      nomeFile: [''],
      contentType: [''],
    });
    this.documentiIdentita.push(documentoGroup);
  }

  removeDocumento(index: number): void {
    this.documentiIdentita.removeAt(index);
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  resetForm() {
    this.addForm.reset();
    this.documentiIdentita.clear();
  }

  private formatDateForBackend(date: string | Date): string {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }

  onSubmit() {
    window.scrollTo(0, 0);
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }
    const formValue = this.addForm.getRawValue();
    console.log(formValue.cittadino.dataDiNascita);

    formValue.cittadino.dataDiNascita = this.formatDateForBackend(
      formValue.cittadino.dataDiNascita
    );

    if (formValue.cittadino.documenti_identita) {
      formValue.cittadino.documenti_identita =
        formValue.cittadino.documenti_identita.map(
          (doc: any, index: number) => {
            const file = this.selectedFiles[index];
            return {
              ...doc,
              data_emissione: this.formatDateForBackend(doc.data_emissione),
              data_scadenza: this.formatDateForBackend(doc.data_scadenza),
              nomeFile: file ? file.name : '',
              contentType: file ? file.type : '',
            };
          }
        );
    }

    const formData = new FormData();
    const anagraficaBlob = new Blob([JSON.stringify(formValue)], {
      type: 'application/json',
    });
    formData.append('anagrafica', anagraficaBlob, 'anagrafica.json');

    Object.entries(this.selectedFiles).forEach(([index, file]) => {
      formData.append('documenti', file, file.name);
    });

    this.anagraficaService.addAnagrafica(formData).subscribe({
      next: (response) => {
        this.submitted = false;
        this.router.navigate(['/anagrafica']);
      },
      error: (error) => {
        if (
          error.status === 400 &&
          error.error?.message?.includes('documenti')
        ) {
          this.errorMessage =
            'Errore: Il numero di documenti nel JSON non corrisponde ai file caricati';
        } else {
          this.errorMessage = "Errore durante la creazione dell'anagrafica";
        }
        console.error('Error:', error);
      },
    });
  }

  openUploadModal(index: number) {
    this.currentDocumentIndex = index;
    const documentiFormArray = this.documentiIdentita;
    const currentDoc = documentiFormArray.at(index);
    const selectedType = currentDoc.get('tipo_documento')
      ?.value as TipoDocumento;

    if (selectedType) {
      const uploadModalType = this.documentTypeMap[selectedType];
      this.uploadForm.patchValue({
        documentType: uploadModalType,
      });
    } else {
      this.uploadForm.reset();
    }

    this.bootstrapService.showModal('uploadModal');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.currentDocumentIndex !== -1) {
      this.selectedFiles[this.currentDocumentIndex] = file;

      this.displayFileNames[this.currentDocumentIndex] = file.name;
      this.hasUploadedFile = true;
    }
  }
  saveDocument() {
    if (
      this.uploadForm.valid &&
      this.currentDocumentIndex !== -1 &&
      this.selectedFiles[this.currentDocumentIndex]
    ) {
      const documenti = this.documentiIdentita;
      const currentDoc = documenti.at(this.currentDocumentIndex);
      const currentFile = this.selectedFiles[this.currentDocumentIndex];

      if (currentDoc && currentFile) {
        currentDoc.patchValue({
          nomeFile: currentFile.name,
          contentType: currentFile.type,
        });

        this.hasUploadedFile = true;
        this.bootstrapService.hideModal('uploadModal');

        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    }
  }

  removeFile() {
    if (this.currentDocumentIndex !== -1) {
      delete this.selectedFiles[this.currentDocumentIndex];
      delete this.displayFileNames[this.currentDocumentIndex];

      const documento = this.documentiIdentita.at(this.currentDocumentIndex);
      documento.patchValue({
        nomeFile: null,
        contentType: null,
      });

      this.hasUploadedFile = false;

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  getFileName(index: number): string {
    return this.displayFileNames[index] || '';
  }

  hasFileForDocument(index: number): boolean {
    return !!this.selectedFiles[index];
  }
}
