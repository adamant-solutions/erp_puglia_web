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
    { label: 'Nuovo Contratto', link: '' }
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
      canoneMensile: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*\.?[0-9]+$')]],
      statoContratto: ['ATTIVO', Validators.required],
      descrizione: [''],
      unitaImmobiliare: ['', Validators.required],
      intestatari: this.fb.array([])
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
      
 
    }
  }

  private prepareFormData() {
    const formValue = this.contratoForm.getRawValue();
    return {
      ...formValue,
      unitaImmobiliare: { id: formValue.unitaImmobiliare.id },
      intestatari: formValue.intestatari.map((int: any) => ({
        intestatario: { id: int.intestatario.id },
        dataInizio: this.formatDate(int.dataInizio)
      })),
      dataInizio: this.formatDate(formValue.dataInizio),
      dataFine: formValue.dataFine ? this.formatDate(formValue.dataFine) : null
    };
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

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }


  }




