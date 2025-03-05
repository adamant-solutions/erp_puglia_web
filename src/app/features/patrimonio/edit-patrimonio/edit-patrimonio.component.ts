import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Patrimonio,
  TipoAmministrazione,
  StatoDisponibilita,
  TipoDocumento,
} from 'src/app/core/models/patrimonio.model';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import * as moment from 'moment';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { comuni, provinces } from 'src/app/core/models/province-data.model';

@Component({
  selector: 'app-edit-patrimonio',
  templateUrl: './edit-patrimonio.component.html',
  styleUrls: ['./edit-patrimonio.component.css'],
})
export class EditPatrimonioComponent implements OnInit {
  pageTitle: string = 'Modifica Unità Immobiliare';
  selectedFiles: any[] = [];
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Unità Immobiliare', link: '/patrimonio' },
  ];

  patrimonio!: Patrimonio;
  patrimonioId!: number;
  deleteFileIndex: number = -1;

  modificaForm!: FormGroup;

  tipoAmministrazioneList: TipoAmministrazione[] = [
    TipoAmministrazione.DIRETTA,
    TipoAmministrazione.INDIRETTA,
    TipoAmministrazione.MISTA,
  ];
  statoDisponibilitaList: StatoDisponibilita[] = [
    StatoDisponibilita.DISPONIBILE,
    StatoDisponibilita.OCCUPATO,
    StatoDisponibilita.IN_MANUTENZIONE,
    StatoDisponibilita.SFITTO,
    StatoDisponibilita.NON_DISPONIBILE,
  ];
  documentTypes: TipoDocumento[] = [
    TipoDocumento.CATASTALE,
    TipoDocumento.CERTIFICAZIONE_ENERGETICA,
    TipoDocumento.TAVOLA_PROGETTO,
    TipoDocumento.ATTO_PROVENIENZA,
    TipoDocumento.ALTRO,
  ];

  provinces = [...provinces]
  comuni = [...comuni];
  filteredComuni: any[] = [];

  initialFormValues!: Patrimonio;

  submitted: boolean = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private patrimonioService: PatrimonioService,
    private bootstrapService: BootstrapService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Get data from resolver
    this.activatedRoute.data.subscribe(({ patrimonioByIdResolver }) => {
      this.patrimonio = patrimonioByIdResolver;
      console.log('patrimonioByIdResolver:', patrimonioByIdResolver);

      this.patrimonioId = patrimonioByIdResolver.id;
      console.log('Patrimonio ID:', this.patrimonioId);
    });

    // Init form
    this.initForm();

    // Filter comuni based on the selected provincia field (the initial value of provincia that comes from BE)
    this.filteredComuni = this.comuni.filter(
      (comune) => comune.provincia === this.patrimonio.provincia
    );
    // Watch for changes in the provincia field and filter comuni accordingly
    this.modificaForm
      .get('provincia')
      ?.valueChanges.subscribe((selectedProvincia) => {
        this.filteredComuni = this.comuni.filter(
          (comune) => comune.provincia === selectedProvincia
        );

        // Reset the comune field when provincia changes
        this.modificaForm.get('comune')?.reset();
      });
  }

  initForm() {
    this.modificaForm = this.formBuilder.group({
      id: [this.patrimonio.id],

      metriQuadri: [
        this.patrimonio.metriQuadri,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      ], // Regex for floating-point numbers
      quartiere: [this.patrimonio.quartiere, Validators.required],
      tipoAmministrazione: [
        this.patrimonio.tipoAmministrazione,
        Validators.required,
      ],
      statoDisponibilita: [
        this.patrimonio.statoDisponibilita,
        Validators.required,
      ],
      comune: [this.patrimonio.comune, Validators.required],
      provincia: [
        this.patrimonio.provincia,
        [Validators.required, Validators.maxLength(2)],
      ],
      indirizzo: [this.patrimonio.indirizzo, Validators.required],
      sezioneUrbana: [
        this.patrimonio.sezioneUrbana,
        [Validators.required, Validators.maxLength(3)],
      ],
      foglio: [
        this.patrimonio.foglio,
        [Validators.required, Validators.maxLength(4)],
      ],
      particella: [
        this.patrimonio.particella,
        [Validators.required, Validators.maxLength(5)],
      ],
      categoriaCatastale: [
        this.patrimonio.categoriaCatastale,
        [Validators.required, Validators.maxLength(3)],
      ],
      classeCatastale: [
        this.patrimonio.classeCatastale,
        [Validators.required, Validators.maxLength(2)],
      ],
      renditaCatastale: [
        this.patrimonio.renditaCatastale,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      ], // Regex for floating-point numbers
      consistenzaCatastale: [
        this.patrimonio.consistenzaCatastale,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      ], // Regex for floating-point numbers
      zona: [this.patrimonio.zona],
      classeEnergetica: [this.patrimonio.classeEnergetica],
      descrizione: [this.patrimonio.descrizione],
      civico: [this.patrimonio.civico],
      subalterno: [this.patrimonio.subalterno],
      piano: [this.patrimonio.piano],

      documenti: this.formBuilder.array(
        this.patrimonio.documenti
          ? this.patrimonio.documenti.map((doc: any) =>
              this.formBuilder.group({
                id: [doc.id],
                tipoDocumento: [doc.tipoDocumento],
                dataDocumento: [doc.dataDocumento],
                percorsoFile: [doc.percorsoFile],
                contentType: ['application/pdf'],
                descrizione: [doc.descrizione],
              })
            )
          : []
      ),
    });

    this.selectedFiles = this.patrimonio.documenti
      ? new Array(this.patrimonio.documenti.length).fill(null)
      : [];

    this.initialFormValues = this.modificaForm.getRawValue();
  }

  get documentiList(): FormArray {
    return this.modificaForm.get('documenti') as FormArray;
  }

  addDocumento(): void {
    const documentoGroup = this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
      dataDocumento: ['', Validators.required],
      percorsoFile: ['', Validators.required],
      contentType: ['application/pdf'],
      descrizione: [''],
    });
    this.documentiList.push(documentoGroup);
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[index] = file;

      const documentControl = this.documentiList.at(index);
      documentControl.patchValue({
        percorsoFile: file.name,
        contentType: file.type || 'application/pdf',
      });

      documentControl.markAsDirty();
      console.log(`File selected at index ${index}:`, file.name);
    }
  }

  deleteDocument(index: number) {
    this.showDeleteFileModal(index);
  }

  showDeleteFileModal(index: number) {
    this.deleteFileIndex = index;
    this.bootstrapService.showModal('deleteFileModal');
  }

  confirmDeleteFile() {
    if (this.deleteFileIndex !== -1) {
      const documento = this.documentiList.at(this.deleteFileIndex);
      const documentoId = documento.get('id')?.value;

      if (documentoId) {
        this.patrimonioService
          .deleteDocument(this.patrimonioId, documentoId)
          .subscribe({
            next: () => {
              this.documentiList.removeAt(this.deleteFileIndex);
              this.selectedFiles[this.deleteFileIndex] = null;
              this.bootstrapService.hideModal('deleteFileModal');
              this.deleteFileIndex = -1;
              this.notificationService.addNotification({
                message: "Il documento è stato eliminato con successo!",
                type: 'success',
                timeout: 3000,
              });
            },
            error: (error) => {
              this.errorMessage = 'Eliminazione del documento non riuscita.';
              this.bootstrapService.hideModal('deleteFileModal');
              this.deleteFileIndex = -1;
            },
          });
      } else {
        this.documentiList.removeAt(this.deleteFileIndex);
        this.selectedFiles[this.deleteFileIndex] = null;
        this.bootstrapService.hideModal('deleteFileModal');
        this.deleteFileIndex = -1;
      }
    }
  }
  removeFile(index: number) {
    const documento = this.documentiList.at(index);
    const documentoId = documento.get('id')?.value;

    if (documentoId) {
      this.showDeleteFileModal(index);
    } else {
      this.selectedFiles[index] = null;
      documento.patchValue({
        percorsoFile: null,
        contentType: null,
      });
    }
  }

  indietro() {
    this.router.navigate(['/patrimonio']);
  }

  resetForm() {
    // Reset the form to initial values
    this.modificaForm.reset(this.initialFormValues);

    // Explicitly set the comune field's value to match the initial value
    this.modificaForm.get('comune')?.setValue(this.initialFormValues.comune);
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.modificaForm.invalid) {
      return;
    }

    const filesToUpload: File[] = [];

    this.documentiList.controls.forEach((control, index) => {
      const dataDocumento = control.get('dataDocumento')?.value;
      if (dataDocumento) {
        control.patchValue({
          dataDocumento: moment(dataDocumento).format('YYYY-MM-DD'),
        });
      }

      if (this.selectedFiles[index]) {
        filesToUpload.push(this.selectedFiles[index]);
      }
    });

    const formValue = this.modificaForm.getRawValue();

    formValue.documenti = formValue.documenti
      .map((doc: any, index: number) => {
        if (this.selectedFiles[index]) {
          return {
            ...doc,
            percorsoFile: this.selectedFiles[index].name,
          };
        }
        return doc;
      })
      .filter((doc: any) => doc.percorsoFile);

    this.patrimonioService
      .modificaPatrimonio(formValue, filesToUpload)
      .subscribe({
        next: () => {
          this.submitted = false;

          this.notificationService.addNotification({
            message: 'Unità immobiliare salvata con successo!',
            type: 'success',
            timeout: 3000,
          });

          this.router.navigate([]);
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: this.handleError(error.error),
            type: 'error',
            timeout: 20000,
          });
        },
      });
  }

  private handleError(error: any): string {
    switch (error.status) {
      case 400:
        return 'Dati non validi. Controlla i campi obbligatori.';
      case 422:
        return 'Dati non validi o unità immobiliare già esistente.';
      case 409:
        return error.message;
      case 500:
        return error.message;
      default:
        return 'Errore durante il salvataggio unità immobiliare.';
    }
  }
}
