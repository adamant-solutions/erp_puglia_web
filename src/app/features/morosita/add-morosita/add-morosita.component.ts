
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MorositaService } from 'src/app/core/services/morosita.service';
import { ModelLight } from 'src/app/core/models/contratto.model';

@Component({
  selector: 'app-add-morosita',
  templateUrl: './add-morosita.component.html',
  styleUrls: ['./add-morosita.component.css']
})
export class AddMorositaComponent implements OnInit {
  pageTitle = 'Nuova Morosità';
  morositaForm: FormGroup;
  submitted = false;
  errorMsg = '';
  contratti: ModelLight[] = [];

statoOptions = [
  { value: 'INTIMATA', label: 'Intimata' },
  { value: 'ACCERTATA', label: 'Accertata' },
  { value: 'IN_RATEIZZAZIONE', label: 'In Rateizzazione' },
  { value: 'IN_RISCOSSIONE', label: 'In Riscossione' },
  { value: 'IN_CONTENZIOSO', label: 'In Contenzioso' },
  { value: 'INESIGIBILE', label: 'Inesigibile' },
  { value: 'ESTINTA', label: 'Estinta' },
  { value: 'SOSPESA', label: 'Sospesa' }
];
  modalitaContattoOptions = [{value:'TELEFONO', label:'Telefono'}, {value:'EMAIL', label:'E-mail',}, {value:'SMS', label:'SMS'}];
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Morosità', link: '/morosita' }
  ];

  validationMessages = {
    contrattoId: 'Contratto è obbligatorio',
    dataRilevazione: 'Data Rilevazione è obbligatorio',
    dataScadenza: 'Data Scadenza è obbligatorio',
    importoDovuto: 'Importo Dovuto è obbligatorio',
    importoVersato: 'Importo Versato è obbligatorio',
    importoMorosita: 'Importo Morosità è obbligatorio',
    stato: 'Stato è obbligatorio',
    tentativiContatto: 'Tentativi Contatto è obbligatorio'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private morositaService: MorositaService
  ) {
    this.morositaForm = this.initForm();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contratti = data['contratti'] || [];
    });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      contrattoId: [null, Validators.required],
      dataRilevazione: ['', Validators.required],
      dataScadenza: ['', Validators.required],
      importoDovuto: ['', [Validators.required, Validators.min(0)]],
      importoVersato: ['', [Validators.required, Validators.min(0)]],
      importoMorosita: ['', [Validators.required, Validators.min(0)]],
      stato: ['', Validators.required],
      note: [''],
      tentativiContatto: ['', [Validators.required, Validators.min(0)]],
      modalitaContatto: [''],
      esitoContatto: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.morositaForm.valid) {
      const formData = this.morositaForm.value;
      this.morositaService.addMorosita(formData).subscribe({
        next: () => this.router.navigate(['/morosita']),
        error: this.handleError.bind(this)
      });
    }
  }

  private handleError(error: any) {
    this.errorMsg = error.status === 400 ? 'Dati non validi' : 
                    error.status === 422 ? 'Morosità già esistente' :
                    'Errore durante il salvataggio';
  }
  
  isFieldInvalid(fieldName: string): boolean {
    const field = this.morositaForm.get(fieldName);
    return field ? (this.submitted && field.invalid) : false;
  }
}