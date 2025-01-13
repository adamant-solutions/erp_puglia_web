import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import {
  TipoAmministrazione,
  StatoDisponibilita,
  TipoDocumento,
} from 'src/app/core/models/patrimonio.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-patrimonio',
  templateUrl: './add-patrimonio.component.html',
  styleUrls: ['./add-patrimonio.component.css'],
})
export class AddPatrimonioComponent implements OnInit {
  pageTitle: string = 'Nuova Patrimonio';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Patrimonio', link: '/patrimonio' },
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

  submitted: boolean = false;

  provinces = [
    { sigla: 'BA', nome: 'Bari' },
    { sigla: 'BT', nome: 'Barletta-Andria-Trani' },
    { sigla: 'BR', nome: 'Brindisi' },
    { sigla: 'FG', nome: 'Foggia' },
    { sigla: 'LE', nome: 'Lecce' },
    { sigla: 'TA', nome: 'Taranto' },
  ];

  comuni = [
    { nome: 'Triggiano', provincia: 'BA' },
    { nome: 'Turi', provincia: 'BA' },
    { nome: 'Valenzano', provincia: 'BA' },
    { nome: 'Spinazzola', provincia: 'BT' },
    { nome: 'Trani', provincia: 'BT' },
    { nome: 'Trinitapoli', provincia: 'BT' },
    { nome: 'Torchiarolo', provincia: 'BR' },
    { nome: 'Torre Santa Susanna', provincia: 'BR' },
    { nome: 'Villa Castelli', provincia: 'BR' },
    { nome: 'Volturara Appula', provincia: 'FG' },
    { nome: 'Volturino', provincia: 'FG' },
    { nome: 'Zapponeta', provincia: 'FG' },
    { nome: 'Veglie', provincia: 'LE' },
    { nome: 'Vernole', provincia: 'LE' },
    { nome: 'Zollino', provincia: 'LE' },
    { nome: 'Avetrana', provincia: 'TA' },
    { nome: 'Carosino', provincia: 'TA' },
    { nome: 'Castellaneta', provincia: 'TA' },
  ];

  filteredComuni: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private patrimonioService: PatrimonioService
  ) {}

  ngOnInit() {
    this.initForm();

    // Watch for changes in the provincia field and filter comuni accordingly
    this.addForm
      .get('provincia')
      ?.valueChanges.subscribe((selectedProvincia) => {
        this.filteredComuni = this.comuni.filter(
          (comune) => comune.provincia === selectedProvincia
        );

        // Reset the comune field when provincia changes
        this.addForm.get('comune')?.reset();
      });
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      id: [-1],

      metriQuadri: [null],
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
      renditaCatastale: [null, Validators.required],
      consistenzaCatastale: [null, Validators.required],
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
  }

  removeDocumento(index: number): void {
    this.documentiList.removeAt(index);
  }

  indietro() {
    this.router.navigate(['/patrimonio']);
  }

  resetForm() {
    this.addForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    // console.log('Form controls:', this.addForm.controls);
    console.log(
      'Form data before converting metriQuadri, renditaCatastale, consistenzaCatastale & dataDocumento:',
      this.addForm.value
    );

    // Convert dataDocumento before submitting
    this.documentiList?.controls.forEach((control, index) => {
      console.log(
        `Data documento for document ${index + 1}:`,
        control.get('dataDocumento')?.value
      );

      // Convert the date and update the individual control
      const sendConvertedDataDocumento = moment(
        control.get('dataDocumento')?.value
      ).format('YYYY-MM-DD');
      console.log('Converted dataDocumento:', sendConvertedDataDocumento);

      control.patchValue({
        dataDocumento: sendConvertedDataDocumento,
      });
    });

    // Convert float values before submitting
    const formValue = this.addForm.getRawValue();

    /*
    formValue.metriQuadri = parseFloat(formValue.metriQuadri as string) || 0;
    formValue.renditaCatastale = parseFloat(formValue.renditaCatastale as string) || 0;
    formValue.consistenzaCatastale = parseFloat(formValue.consistenzaCatastale as string) || 0;
    */

    // Convert to float and ensure they have floating point format (e.g., 1.00)
    formValue.metriQuadri = parseFloat(formValue.metriQuadri as string).toFixed(
      2
    ); // 2 decimal points
    formValue.renditaCatastale = parseFloat(
      formValue.renditaCatastale as string
    ).toFixed(2); // 2 decimal points
    formValue.consistenzaCatastale = parseFloat(
      formValue.consistenzaCatastale as string
    ).toFixed(2); // 2 decimal points

    // Ensure the values are valid floats
    formValue.metriQuadri =
      formValue.metriQuadri === 'NaN' ? 0.0 : parseFloat(formValue.metriQuadri);
    formValue.renditaCatastale =
      formValue.renditaCatastale === 'NaN'
        ? 0.0
        : parseFloat(formValue.renditaCatastale);
    formValue.consistenzaCatastale =
      formValue.consistenzaCatastale === 'NaN'
        ? 0.0
        : parseFloat(formValue.consistenzaCatastale);

    console.log('Form data to be sent to BE:', formValue);

    if (this.addForm.invalid) {
      return;
    } else {
      this.patrimonioService.addPatrimonio(formValue).subscribe({
        next: (data: any) => {
          console.log('Form data (response):', data);
          this.addForm.reset();
          this.submitted = false;
          this.router.navigate(['/patrimonio']);
        },
        error: (error: any) => {
          console.error('An error occurred while adding patrimonio:', error);
        },
      });
    }
  }
}
