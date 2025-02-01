import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StatoContratto } from 'src/app/core/models/contratto.model';
import { ContrattiService } from 'src/app/core/services/contratti.service';

interface SelectOption {
  id: number;
  descrizione: string;
}
@Component({
  selector: 'app-add-contratti',
  templateUrl: './add-contratti.component.html',
  styleUrls: ['./add-contratti.component.css']
})
export class AddContrattiComponent {
  pageTitle = 'Nuovo Contratto';
  contratoForm: FormGroup;
  submitted = false;
  errorMsg = '';
  statoContrattoOptions: StatoContratto[] = ['ATTIVO', 'SCADUTO', 'DISDETTO', 'ANNULLATO'];
  unitaImmobiliariOptions: SelectOption[] = [];
  intestatariOptions: SelectOption[] = [];
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contratti', link: '/contratti-locazione' },
   
  ];

  @ViewChild('confermaModal') confermaModal!: ElementRef;
  private modal: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contrattiService: ContrattiService,
  
  ) {
    this.contratoForm = this.initForm();
  }

  ngOnInit() {
    this.loadData();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      dataInizio: ['', Validators.required],
      dataFine: [''],
     
      statoContratto: ['ATTIVO', Validators.required],
      descrizione: [''],
      canoneMensile: [null, [Validators.required, Validators.min(1)]],
      unitaImmobiliare: [null, Validators.required],
      intestatari: this.fb.array([], Validators.required)
    });
  }

  private loadData() {
    this.route.data.subscribe({
      next: (data) => {
        this.unitaImmobiliariOptions = data['unitaImmobiliari']?.body || [];
        this.intestatariOptions = data['intestatari']?.body || [];
      },
      error: (error) => {
        this.errorMsg = 'Errore nel caricamento dei dati';
        console.error(error);
      }
    });
  }

  get intestatari(): FormArray {
    return this.contratoForm.get('intestatari') as FormArray;
  }

  addIntestatario() {
    const intestatarioGroup = this.fb.group({
      intestatario: this.fb.group({
        id: ['', Validators.required]
      }),
      dataInizio: ['', Validators.required]
    });
    this.intestatari.push(intestatarioGroup);
  }

  removeIntestatario(index: number) {
    this.intestatari.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.contratoForm.valid) {
      const formData = this.prepareFormData();
      
      this.contrattiService.addContratto(formData).subscribe({
        next: (createdContratto) => {
          this.router.navigate(['/contratti-locazione']);
        },
        error: (error) => {
          this.handleError(error);
     
          if (error.error && error.error.errors) {
            this.handleValidationErrors(error.error.errors);
          }
        }
      });
    }
  }

  private prepareFormData(): FormData {
    const formValue = this.contratoForm.getRawValue();
    const formData = new FormData();
    
    const contratto = {
      dataInizio: this.formatDate(formValue.dataInizio),
      dataFine: formValue.dataFine ? this.formatDate(formValue.dataFine) : null,
      canoneMensile: formValue.canoneMensile,
      statoContratto: formValue.statoContratto,
      descrizione: formValue.descrizione || '',
      unitaImmobiliare: {
        id: formValue.unitaImmobiliare.id 
      },
      intestatari: formValue.intestatari.map((int: any) => ({
        intestatario: {
          id: int.intestatario.id.id 
        },
        dataInizio: this.formatDate(int.dataInizio)
      })),
      documenti: []
    };
  
    formData.append(
      'contratto',
      new Blob([JSON.stringify(contratto)], { type: 'application/json' }),
      'contratto.json'
    );
  
    return formData;
  }

  private handleError(error: any) {
    switch (error.status) {
      case 400:
        this.errorMsg = 'Dati non validi. Controlla i campi obbligatori.';
        break;
      case 422:
        this.errorMsg = 'Dati non validi o contratto già esistente.';
        break;
      case 500:
        this.errorMsg = 'Errore del server. Riprova più tardi.';
        break;
      default:
        this.errorMsg = 'Errore durante il salvataggio del contratto.';
    }
    // this.messageService.error(this.errorMsg);
  }
  private handleValidationErrors(errors: any[]) {
    errors.forEach(err => {
      const field = this.contratoForm.get(err.fieldName);
      if (field) {
        field.setErrors({ serverError: err.message });
      }
    });
  }
  private formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }


  }




