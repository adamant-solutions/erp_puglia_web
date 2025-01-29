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

@Component({
  selector: 'app-edit-patrimonio',
  templateUrl: './edit-patrimonio.component.html',
  styleUrls: ['./edit-patrimonio.component.css'],
})
export class EditPatrimonioComponent implements OnInit {
  pageTitle: string = 'Modifica Patrimonio';
  selectedFiles: any[] = [];
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Patrimonio', link: '/patrimonio' },
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

  initialFormValues!: Patrimonio;

  submitted: boolean = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private patrimonioService: PatrimonioService,
    private bootstrapService: BootstrapService
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
        Validators.pattern(/^-?\d+(\.\d+)?$/),
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
        contentType: file.type || 'application/pdf'
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
        this.patrimonioService.deleteDocument(this.patrimonioId, documentoId)
          .subscribe({
            next: () => {
              this.documentiList.removeAt(this.deleteFileIndex);
              this.selectedFiles[this.deleteFileIndex] = null;
              this.bootstrapService.hideModal('deleteFileModal');
              this.deleteFileIndex = -1;
            },
            error: (error) => {
              this.errorMessage = 'Failed to delete document.';
              this.bootstrapService.hideModal('deleteFileModal');
              this.deleteFileIndex = -1;
            }
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
        contentType: null
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
  
    
    formValue.documenti = formValue.documenti.map((doc: any, index: number) => {
     
      if (this.selectedFiles[index]) {
        return {
          ...doc,
          percorsoFile: this.selectedFiles[index].name
        };
      }
      return doc;
    }).filter((doc: any) => doc.percorsoFile);
  
    this.patrimonioService.modificaPatrimonio(formValue, filesToUpload).subscribe({
      next: () => {
        this.router.navigate(['/patrimonio']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to update patrimonio. Please try again.';
        console.error('Error updating patrimonio:', err);
      },
    });
  }
}
