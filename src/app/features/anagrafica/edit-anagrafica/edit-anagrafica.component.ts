import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Anagrafica,
  TipoDocumento,
} from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import * as moment from 'moment';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';

@Component({
  selector: 'app-edit-anagrafica',
  templateUrl: './edit-anagrafica.component.html',
  styleUrls: ['./edit-anagrafica.component.css'],
})
export class EditAnagraficaComponent implements OnInit {
  pageTitle: string = 'Modifica Anagrafica';
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  hasUploadedFile = false;
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  anagrafica!: Anagrafica;
  anagraficaId!: number;
  modificaForm!: FormGroup;
  documentTypes: TipoDocumento[] = [
    TipoDocumento.CARTA_DEL_IDENTITA,
    TipoDocumento.PASSAPORTO,
    TipoDocumento.PATENTE,
  ];
  initialFormValues!: Anagrafica;
  submitted: boolean = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private anagraficaService: AnagraficaService,
    private bootstrapService: BootstrapService
  ) { this.uploadForm = this.formBuilder.group({
    documentType: ['', Validators.required]
  });}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anagraficaByIdResolver }) => {
      this.anagrafica = anagraficaByIdResolver;
      console.log('anagraficaByIdResolver:', anagraficaByIdResolver);

      this.anagraficaId = anagraficaByIdResolver.id;
      console.log('Anagrafica ID:', this.anagraficaId);
    });

    this.initForm();
  }

  initForm() {
    this.modificaForm = this.formBuilder.group({
      id: [this.anagrafica.id],

      cittadino: this.formBuilder.group({
        id: [this.anagrafica.cittadino.id],

        nome: [this.anagrafica.cittadino.nome, Validators.required],
        cognome: [this.anagrafica.cittadino.cognome, Validators.required],
        codiceFiscale: [
          this.anagrafica.cittadino.codiceFiscale,
          Validators.required,
        ],
        genere: [this.anagrafica.cittadino.genere, Validators.required],
        cittadinanza: [
          this.anagrafica.cittadino.cittadinanza,
          Validators.required,
        ],
        dataDiNascita: [
          this.anagrafica.cittadino.dataDiNascita,
          [Validators.required],
        ],

        residenza: this.formBuilder.group({
          id: [this.anagrafica.cittadino.residenza.id],

          indirizzo: [this.anagrafica.cittadino.residenza.indirizzo],
          civico: [this.anagrafica.cittadino.residenza.civico],
          cap: [this.anagrafica.cittadino.residenza.cap],
          comuneResidenza: [
            this.anagrafica.cittadino.residenza.comuneResidenza,
          ],
          provinciaResidenza: [
            this.anagrafica.cittadino.residenza.provinciaResidenza,
          ],
          statoResidenza: [this.anagrafica.cittadino.residenza.statoResidenza],
        }),
        contatti: this.formBuilder.group({
          id: [this.anagrafica.cittadino.contatti.id],

          telefono: [this.anagrafica.cittadino.contatti.telefono],
          cellulare: [this.anagrafica.cittadino.contatti.cellulare],
          email: [this.anagrafica.cittadino.contatti.email],
          pec: [this.anagrafica.cittadino.contatti.pec],
        }),
        luogo_nascita: this.formBuilder.group({
          comune: [
            this.anagrafica.cittadino.luogo_nascita.comune,
            Validators.required,
          ],
          provincia: [this.anagrafica.cittadino.luogo_nascita.provincia],
          stato: [this.anagrafica.cittadino.luogo_nascita.stato],
        }),
        documenti_identita: this.formBuilder.array(
          this.anagrafica.cittadino.documenti_identita
            ? this.anagrafica.cittadino.documenti_identita.map((doc: any) =>
                this.formBuilder.group({
                  id: [doc.id],
                  tipo_documento: [doc.tipo_documento],
                  numero_documento: [doc.numero_documento],
                  data_emissione: [doc.data_emissione],
                  data_scadenza: [doc.data_scadenza],
                  ente_emittente: [doc.ente_emittente],
                })
              )
            : []
        ),
      }),
    });

    this.initialFormValues = this.modificaForm.getRawValue();
  }

  get documentiIdentita(): FormArray {
    return this.modificaForm.get('cittadino.documenti_identita') as FormArray;
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

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  resetForm() {
    this.modificaForm.reset(this.initialFormValues);
  }

  onSubmit() {
    this.submitted = true;

    // console.log('Form controls:', this.modificaForm.controls);
    console.log(
      'Form data before converting dataDiNascita:',
      this.modificaForm.value
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
      this.modificaForm.value.cittadino.dataDiNascita
    ).format('YYYY-MM-DD');
    console.log('Converted dataDiNascita:', sendConvertedDataDiNascita);

    this.modificaForm.patchValue({
      cittadino: {
        dataDiNascita: sendConvertedDataDiNascita,
      },
    });
    console.log('Form data to be sent to BE:', this.modificaForm.value);

    if (this.modificaForm.invalid) {
      return;
    } else {
      this.anagraficaService
        .modificaAnagrafica(this.modificaForm.getRawValue())
        .subscribe({
          next: (data: any) => {
            console.log('Form data (response):', data);

            this.submitted = false;

            // Success message here ...

            // this.router.navigate(['/anagrafica/modifica-anagrafica', this.anagraficaId]);
            window.location.reload();
          },
          error: (error: any) => {
            console.error(
              'An error occurred while modifying anagrafica:',
              error
            );
            this.errorMessage =
              'Failed to update anagrafica. Please try again.';
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
