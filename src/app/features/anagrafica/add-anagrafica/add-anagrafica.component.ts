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
import { NotificationService } from 'src/app/core/services/notification.service';

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

  today: Date = new Date();

  provinces = [
    { sigla: 'BA', nome: 'Bari' },
    { sigla: 'BT', nome: 'Barletta-Andria-Trani' },
    { sigla: 'BR', nome: 'Brindisi' },
    { sigla: 'FG', nome: 'Foggia' },
    { sigla: 'LE', nome: 'Lecce' },
    { sigla: 'TA', nome: 'Taranto' },
  ];

  comuni = [
    { nome: 'Acquaviva delle Fonti', provincia: 'BA' },
    { nome: 'Adelfia', provincia: 'BA' },
    { nome: 'Alberobello', provincia: 'BA' },
    { nome: 'Altamura', provincia: 'BA' },
    { nome: 'Bari', provincia: 'BA' },
    { nome: 'Binetto', provincia: 'BA' },
    { nome: 'Bitetto', provincia: 'BA' },
    { nome: 'Bitonto', provincia: 'BA' },
    { nome: 'Bitritto', provincia: 'BA' },
    { nome: 'Capurso', provincia: 'BA' },
    { nome: 'Casamassima', provincia: 'BA' },
    { nome: 'Cassano delle Murge', provincia: 'BA' },
    { nome: 'Castellana Grotte', provincia: 'BA' },
    { nome: 'Cellamare', provincia: 'BA' },
    { nome: 'Conversano', provincia: 'BA' },
    { nome: 'Corato', provincia: 'BA' },
    { nome: 'Gioia del Colle', provincia: 'BA' },
    { nome: 'Giovinazzo', provincia: 'BA' },
    { nome: 'Gravina in Puglia', provincia: 'BA' },
    { nome: 'Grumo Appula', provincia: 'BA' },
    { nome: 'Locorotondo', provincia: 'BA' },
    { nome: 'Modugno', provincia: 'BA' },
    { nome: 'Mola di Bari', provincia: 'BA' },
    { nome: 'Molfetta', provincia: 'BA' },
    { nome: 'Monopoli', provincia: 'BA' },
    { nome: 'Noci', provincia: 'BA' },
    { nome: 'Noicattaro', provincia: 'BA' },
    { nome: 'Palo del Colle', provincia: 'BA' },
    { nome: 'Poggiorsini', provincia: 'BA' },
    { nome: 'Polignano a Mare', provincia: 'BA' },
    { nome: 'Putignano', provincia: 'BA' },
    { nome: 'Rutigliano', provincia: 'BA' },
    { nome: 'Ruvo di Puglia', provincia: 'BA' },
    { nome: 'Sammichele di Bari', provincia: 'BA' },
    { nome: 'Sannicandro di Bari', provincia: 'BA' },
    { nome: 'Santeramo in Colle', provincia: 'BA' },
    { nome: 'Terlizzi', provincia: 'BA' },
    { nome: 'Toritto', provincia: 'BA' },
    { nome: 'Triggiano', provincia: 'BA' },
    { nome: 'Turi', provincia: 'BA' },
    { nome: 'Valenzano', provincia: 'BA' },
    { nome: 'Andria', provincia: 'BT' },
    { nome: 'Barletta', provincia: 'BT' },
    { nome: 'Bisceglie', provincia: 'BT' },
    { nome: 'Canosa di Puglia', provincia: 'BT' },
    { nome: 'Margherita di Savoia', provincia: 'BT' },
    { nome: 'Minervino Murge', provincia: 'BT' },
    { nome: 'San Ferdinando di Puglia', provincia: 'BT' },
    { nome: 'Spinazzola', provincia: 'BT' },
    { nome: 'Trani', provincia: 'BT' },
    { nome: 'Trinitapoli', provincia: 'BT' },
    { nome: 'Brindisi', provincia: 'BR' },
    { nome: 'Carovigno', provincia: 'BR' },
    { nome: 'Ceglie Messapica', provincia: 'BR' },
    { nome: 'Cellino San Marco', provincia: 'BR' },
    { nome: 'Cisternino', provincia: 'BR' },
    { nome: 'Erchie', provincia: 'BR' },
    { nome: 'Fasano', provincia: 'BR' },
    { nome: 'Francavilla Fontana', provincia: 'BR' },
    { nome: 'Latiano', provincia: 'BR' },
    { nome: 'Mesagne', provincia: 'BR' },
    { nome: 'Oria', provincia: 'BR' },
    { nome: 'Ostuni', provincia: 'BR' },
    { nome: 'San Donaci', provincia: 'BR' },
    { nome: 'San Michele Salentino', provincia: 'BR' },
    { nome: 'San Pancrazio Salentino', provincia: 'BR' },
    { nome: 'San Pietro Vernotico', provincia: 'BR' },
    { nome: 'San Vito dei Normanni', provincia: 'BR' },
    { nome: 'Torchiarolo', provincia: 'BR' },
    { nome: 'Torre Santa Susanna', provincia: 'BR' },
    { nome: 'Villa Castelli', provincia: 'BR' },
    { nome: 'Accadia', provincia: 'FG' },
    { nome: 'Alberona', provincia: 'FG' },
    { nome: 'Anzano di Puglia', provincia: 'FG' },
    { nome: 'Apricena', provincia: 'FG' },
    { nome: 'Ascoli Satriano', provincia: 'FG' },
    { nome: 'Biccari', provincia: 'FG' },
    { nome: 'Bovino', provincia: 'FG' },
    { nome: 'Candela', provincia: 'FG' },
    { nome: 'Carapelle', provincia: 'FG' },
    { nome: 'Carlantino', provincia: 'FG' },
    { nome: 'Carpino', provincia: 'FG' },
    { nome: 'Casalnuovo Monterotaro', provincia: 'FG' },
    { nome: 'Casalvecchio di Puglia', provincia: 'FG' },
    { nome: 'Castelluccio dei Sauri', provincia: 'FG' },
    { nome: 'Castelluccio Valmaggiore', provincia: 'FG' },
    { nome: 'Castelnuovo della Daunia', provincia: 'FG' },
    { nome: 'Celenza Valfortore', provincia: 'FG' },
    { nome: 'Celle di San Vito', provincia: 'FG' },
    { nome: 'Cerignola', provincia: 'FG' },
    { nome: 'Chieuti', provincia: 'FG' },
    { nome: 'Deliceto', provincia: 'FG' },
    { nome: 'Faeto', provincia: 'FG' },
    { nome: 'Foggia', provincia: 'FG' },
    { nome: 'Ischitella', provincia: 'FG' },
    { nome: 'Isole Tremiti', provincia: 'FG' },
    { nome: 'Lesina', provincia: 'FG' },
    { nome: 'Lucera', provincia: 'FG' },
    { nome: 'Manfredonia', provincia: 'FG' },
    { nome: 'Mattinata', provincia: 'FG' },
    { nome: "Monte Sant'Angelo", provincia: 'FG' },
    { nome: 'Monteleone di Puglia', provincia: 'FG' },
    { nome: 'Motta Montecorvino', provincia: 'FG' },
    { nome: 'Ordona', provincia: 'FG' },
    { nome: 'Orsara di Puglia', provincia: 'FG' },
    { nome: 'Orta Nova', provincia: 'FG' },
    { nome: 'Panni', provincia: 'FG' },
    { nome: 'Peschici', provincia: 'FG' },
    { nome: 'Pietramontecorvino', provincia: 'FG' },
    { nome: 'Poggio Imperiale', provincia: 'FG' },
    { nome: 'Rignano Garganico', provincia: 'FG' },
    { nome: "Rocchetta Sant'Antonio", provincia: 'FG' },
    { nome: 'Rodi Garganico', provincia: 'FG' },
    { nome: 'Roseto Valfortore', provincia: 'FG' },
    { nome: 'San Giovanni Rotondo', provincia: 'FG' },
    { nome: 'San Marco in Lamis', provincia: 'FG' },
    { nome: 'San Marco la Catola', provincia: 'FG' },
    { nome: 'San Nicandro Garganico', provincia: 'FG' },
    { nome: 'San Paolo di Civitate', provincia: 'FG' },
    { nome: 'San Severo', provincia: 'FG' },
    { nome: "Sant'Agata di Puglia", provincia: 'FG' },
    { nome: 'Serracapriola', provincia: 'FG' },
    { nome: 'Stornara', provincia: 'FG' },
    { nome: 'Stornarella', provincia: 'FG' },
    { nome: 'Torremaggiore', provincia: 'FG' },
    { nome: 'Troia', provincia: 'FG' },
    { nome: 'Vico del Gargano', provincia: 'FG' },
    { nome: 'Vieste', provincia: 'FG' },
    { nome: 'Volturara Appula', provincia: 'FG' },
    { nome: 'Volturino', provincia: 'FG' },
    { nome: 'Zapponeta', provincia: 'FG' },
    { nome: 'Acquarica del Capo', provincia: 'LE' },
    { nome: 'Alessano', provincia: 'LE' },
    { nome: 'Alezio', provincia: 'LE' },
    { nome: 'Alliste', provincia: 'LE' },
    { nome: 'Andrano', provincia: 'LE' },
    { nome: 'Aradeo', provincia: 'LE' },
    { nome: 'Arnesano', provincia: 'LE' },
    { nome: 'Bagnolo del Salento', provincia: 'LE' },
    { nome: 'Botrugno', provincia: 'LE' },
    { nome: 'Calimera', provincia: 'LE' },
    { nome: 'Campi Salentina', provincia: 'LE' },
    { nome: 'Cannole', provincia: 'LE' },
    { nome: 'Caprarica di Lecce', provincia: 'LE' },
    { nome: 'Carmiano', provincia: 'LE' },
    { nome: 'Carpignano Salentino', provincia: 'LE' },
    { nome: 'Casarano', provincia: 'LE' },
    { nome: 'Castri di Lecce', provincia: 'LE' },
    { nome: 'Castrignano dei Greci', provincia: 'LE' },
    { nome: 'Castrignano del Capo', provincia: 'LE' },
    { nome: 'Cavallino', provincia: 'LE' },
    { nome: 'Collepasso', provincia: 'LE' },
    { nome: 'Copertino', provincia: 'LE' },
    { nome: "Corigliano d'Otranto", provincia: 'LE' },
    { nome: 'Corsano', provincia: 'LE' },
    { nome: 'Cursi', provincia: 'LE' },
    { nome: 'Cutrofiano', provincia: 'LE' },
    { nome: 'Diso', provincia: 'LE' },
    { nome: 'Gagliano del Capo', provincia: 'LE' },
    { nome: 'Galatina', provincia: 'LE' },
    { nome: 'Galatone', provincia: 'LE' },
    { nome: 'Gallipoli', provincia: 'LE' },
    { nome: 'Giuggianello', provincia: 'LE' },
    { nome: 'Giurdignano', provincia: 'LE' },
    { nome: 'Guagnano', provincia: 'LE' },
    { nome: 'Lecce', provincia: 'LE' },
    { nome: 'Lequile', provincia: 'LE' },
    { nome: 'Leverano', provincia: 'LE' },
    { nome: 'Lizzanello', provincia: 'LE' },
    { nome: 'Maglie', provincia: 'LE' },
    { nome: 'Martano', provincia: 'LE' },
    { nome: 'Martignano', provincia: 'LE' },
    { nome: 'Matino', provincia: 'LE' },
    { nome: 'Melendugno', provincia: 'LE' },
    { nome: 'Melissano', provincia: 'LE' },
    { nome: 'Melpignano', provincia: 'LE' },
    { nome: 'Miggiano', provincia: 'LE' },
    { nome: 'Minervino di Lecce', provincia: 'LE' },
    { nome: 'Monteroni di Lecce', provincia: 'LE' },
    { nome: 'Montesano Salentino', provincia: 'LE' },
    { nome: 'Morciano di Leuca', provincia: 'LE' },
    { nome: 'Muro Leccese', provincia: 'LE' },
    { nome: 'Nardò', provincia: 'LE' },
    { nome: 'Neviano', provincia: 'LE' },
    { nome: 'Nociglia', provincia: 'LE' },
    { nome: 'Novoli', provincia: 'LE' },
    { nome: 'Ortelle', provincia: 'LE' },
    { nome: 'Otranto', provincia: 'LE' },
    { nome: 'Palmariggi', provincia: 'LE' },
    { nome: 'Parabita', provincia: 'LE' },
    { nome: 'Patù', provincia: 'LE' },
    { nome: 'Poggiardo', provincia: 'LE' },
    { nome: 'Porto Cesareo', provincia: 'LE' },
    { nome: 'Presicce', provincia: 'LE' },
    { nome: 'Racale', provincia: 'LE' },
    { nome: 'Ruffano', provincia: 'LE' },
    { nome: 'Salice Salentino', provincia: 'LE' },
    { nome: 'Salve', provincia: 'LE' },
    { nome: 'San Cassiano', provincia: 'LE' },
    { nome: 'San Cesario di Lecce', provincia: 'LE' },
    { nome: 'San Donato di Lecce', provincia: 'LE' },
    { nome: 'Sannicola', provincia: 'LE' },
    { nome: 'San Pietro in Lama', provincia: 'LE' },
    { nome: 'Santa Cesarea Terme', provincia: 'LE' },
    { nome: 'Scorrano', provincia: 'LE' },
    { nome: 'Seclì', provincia: 'LE' },
    { nome: 'Sogliano Cavour', provincia: 'LE' },
    { nome: 'Soleto', provincia: 'LE' },
    { nome: 'Specchia', provincia: 'LE' },
    { nome: 'Spongano', provincia: 'LE' },
    { nome: 'Squinzano', provincia: 'LE' },
    { nome: 'Sternatia', provincia: 'LE' },
    { nome: 'Supersano', provincia: 'LE' },
    { nome: 'Surano', provincia: 'LE' },
    { nome: 'Surbo', provincia: 'LE' },
    { nome: 'Taurisano', provincia: 'LE' },
    { nome: 'Taviano', provincia: 'LE' },
    { nome: 'Tiggiano', provincia: 'LE' },
    { nome: 'Trepuzzi', provincia: 'LE' },
    { nome: 'Tricase', provincia: 'LE' },
    { nome: 'Tuglie', provincia: 'LE' },
    { nome: 'Ugento', provincia: 'LE' },
    { nome: 'Uggiano la Chiesa', provincia: 'LE' },
    { nome: 'Veglie', provincia: 'LE' },
    { nome: 'Vernole', provincia: 'LE' },
    { nome: 'Zollino', provincia: 'LE' },
    { nome: 'Avetrana', provincia: 'TA' },
    { nome: 'Carosino', provincia: 'TA' },
    { nome: 'Castellaneta', provincia: 'TA' },
    { nome: 'Crispiano', provincia: 'TA' },
    { nome: 'Faggiano', provincia: 'TA' },
    { nome: 'Fragagnano', provincia: 'TA' },
    { nome: 'Ginosa', provincia: 'TA' },
    { nome: 'Grottaglie', provincia: 'TA' },
    { nome: 'Laterza', provincia: 'TA' },
    { nome: 'Leporano', provincia: 'TA' },
    { nome: 'Lizzano', provincia: 'TA' },
    { nome: 'Manduria', provincia: 'TA' },
    { nome: 'Martina Franca', provincia: 'TA' },
    { nome: 'Maruggio', provincia: 'TA' },
    { nome: 'Massafra', provincia: 'TA' },
    { nome: 'Monteiasi', provincia: 'TA' },
    { nome: 'Montemesola', provincia: 'TA' },
    { nome: 'Monteparano', provincia: 'TA' },
    { nome: 'Mottola', provincia: 'TA' },
    { nome: 'Palagianello', provincia: 'TA' },
    { nome: 'Palagiano', provincia: 'TA' },
    { nome: 'Pulsano', provincia: 'TA' },
    { nome: 'Roccaforzata', provincia: 'TA' },
    { nome: 'San Giorgio Ionico', provincia: 'TA' },
    { nome: 'San Marzano di San Giuseppe', provincia: 'TA' },
    { nome: 'Sava', provincia: 'TA' },
    { nome: 'Statte', provincia: 'TA' },
    { nome: 'Taranto', provincia: 'TA' },
    { nome: 'Torricella', provincia: 'TA' },
  ];

  filteredComuni: any[] = [];

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private anagraficaService: AnagraficaService,
    private bootstrapService: BootstrapService,
    private notifService: NotificationService
  ) {
    this.uploadForm = this.formBuilder.group({
      documentType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.initForm();

    this.addForm
      .get('cittadino.residenza.provinciaResidenza')
      ?.valueChanges.subscribe((selectedProvincia) => {
        this.filteredComuni = this.comuni.filter(
          (comune) => comune.provincia === selectedProvincia
        );

        this.addForm.get('cittadino.residenza.comuneResidenza')?.reset();
      });
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
          indirizzo: ['', Validators.required],
          civico: ['', Validators.required],
          cap: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
          comuneResidenza: ['', Validators.required],
          provinciaResidenza: ['', Validators.required],
          statoResidenza: ['', Validators.required],
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
        this.notifService.addNotification({
          message: "L'anagrafica salvata con successo!",
          type: 'success',
          timeout: 3000,
        });
        this.router.navigate(['/anagrafica']);
      },
      error: (error) => {
        if (
          error.status === 400 &&
          error.error?.message?.includes('documenti')
        ) {
          this.errorMessage =
            'Errore: Il numero di documenti nel JSON non corrisponde ai file caricati';
        } else if (error.status === 500) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = "Errore durante la creazione dell'anagrafica";
        }
        this.notifService.addNotification({
          message: this.errorMessage,
          type: 'error',
          timeout: 5000,
        });
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
