import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  TipoAmministrazione,
  StatoDisponibilita,
  TipoDocumento,
} from 'src/app/core/models/patrimonio.model';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import * as moment from 'moment';
import { NotificationService } from 'src/app/core/services/notification.service';
import { comuni, provinces } from 'src/app/core/models/province-data.model';

@Component({
  selector: 'app-add-patrimonio',
  templateUrl: './add-patrimonio.component.html',
  styleUrls: ['./add-patrimonio.component.css'],
})
export class AddPatrimonioComponent implements OnInit {
  pageTitle: string = 'Nuova Unità Immobiliare';
  fileToUpload: File[][] = [];
  maxFiles = 2;
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Unità Immobiliare', link: '/patrimonio' },
  ];

  addForm!: FormGroup;

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

  provinces = [...provinces];
  comuni = [...comuni];
  filteredComuni: any[] = [];

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private patrimonioService: PatrimonioService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.initForm();

    this.addForm
      .get('provincia')
      ?.valueChanges.subscribe((selectedProvincia) => {
        this.filteredComuni = this.comuni.filter(
          (comune) => comune.provincia === selectedProvincia
        );

        this.addForm.get('comune')?.reset();
      });
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      metriQuadri: [
        null,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      ],
      quartiere: ['', Validators.required],
      tipoAmministrazione: ['', Validators.required],
      statoDisponibilita: ['', Validators.required],
      comune: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.maxLength(2)]],
      indirizzo: ['', Validators.required],
      sezioneUrbana: ['', [Validators.required, Validators.maxLength(3)]],
      foglio: ['', [Validators.required, Validators.maxLength(4)]],
      particella: ['', [Validators.required, Validators.maxLength(5)]],
      categoriaCatastale: ['', [Validators.required, Validators.maxLength(3)]],
      classeCatastale: ['', [Validators.required, Validators.maxLength(2)]],
      renditaCatastale: [
        null,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      ],
      consistenzaCatastale: [
        null,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      ],
      zona: [''],
      classeEnergetica: [''],
      descrizione: [''],
      civico: [''],
      subalterno: [''],
      piano: [''],
      documenti: this.formBuilder.array([]),
    });
  }

  get documentiList(): FormArray {
    return this.addForm.get('documenti') as FormArray;
  }

  addDocumento(): void {
    const documentoGroup = this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
      dataDocumento: ['', Validators.required],
      percorsoFile: ['', Validators.required],
      descrizione: [''],
    });
    this.documentiList.push(documentoGroup);
    this.fileToUpload.push([]);
  }

  getPercorsoFileArray(index: number): FormArray {
    return this.documentiList.at(index).get('percorsoFile') as FormArray;
  }

  removeFile(documentoIndex: number, fileIndex: number): void {
    this.fileToUpload[documentoIndex].splice(fileIndex, 1);
    const fileNames = this.fileToUpload[documentoIndex].map((f) => f.name);
    this.documentiList
      .at(documentoIndex)
      .get('percorsoFile')
      ?.setValue(fileNames);
  }

  removeDocumento(index: number): void {
    this.documentiList.removeAt(index);
    this.fileToUpload.splice(index, 1);
  }

  indietro() {
    this.router.navigate(['/patrimonio']);
  }

  resetForm() {
    this.addForm.reset();
  }

  onFileSelected(event: any, documentoIndex: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileToUpload[documentoIndex] = [file];
      this.documentiList.at(documentoIndex).patchValue({
        percorsoFile: file.name,
      });
    }
  }

  getUploadedFiles(documentoIndex: number): File[] {
    return this.fileToUpload[documentoIndex] || [];
  }

  getFileNames(documentoIndex: number): string {
    return this.fileToUpload[documentoIndex]?.[0]?.name || '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    const formData = new FormData();
    const patrimonio = this.addForm.getRawValue();

    ['metriQuadri', 'renditaCatastale', 'consistenzaCatastale'].forEach(
      (field) => {
        if (patrimonio[field]) {
          patrimonio[field] = parseFloat(patrimonio[field]).toFixed(2);
        }
      }
    );

    patrimonio.documenti.forEach((doc: any, index: number) => {
      doc.dataDocumento = moment(doc.dataDocumento).format('YYYY-MM-DD');

      if (this.fileToUpload[index]?.[0]) {
        const file = this.fileToUpload[index][0];
        formData.append('documenti', file, file.name);
      }
    });

    const patrimonioToSend = {
      ...patrimonio,
      documenti: patrimonio.documenti.map((doc: any, index: number) => ({
        tipoDocumento: doc.tipoDocumento,
        dataDocumento: doc.dataDocumento,
        percorsoFile: this.fileToUpload[index]?.[0]?.name || '',
        descrizione: doc.descrizione,
      })),
    };

    formData.append(
      'unitaImmobiliare',
      new Blob([JSON.stringify(patrimonioToSend)], {
        type: 'application/json',
      })
    );

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.patrimonioService.addPatrimonio(formData).subscribe({
      next: (response) => {
        this.notificationService.addNotification({
          message: 'Unità immobiliare salvata con successo!',
          type: 'success',
          timeout: 3000,
        });
        this.router.navigate(['/patrimonio']);
      },
      error: (error) => {
        this.notificationService.addNotification({
          message: this.handleError(error.error),
          type: 'error',
          timeout: 5000,
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
