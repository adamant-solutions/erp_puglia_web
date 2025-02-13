import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StatoContratto } from 'src/app/core/models/contratto.model';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
  selectedFiles: File[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contrattiService: ContrattiService,
    private notifService: NotificationService
  
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
      intestatari: this.fb.array([], Validators.required),
      documenti: [null] 
    });
  }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
   
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
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
            this.notifService.addNotification({
              message: 'Dati salvati con successo!',
              type: 'success',
              timeout: 3000,
            });
          this.router.navigate(['/contratti-locazione']);
        },
        error: (error) => {
          this.notifService.addNotification({
            message: this.handleError(error.error),
            type: 'error',
            timeout: 5000,
          });
          /* if (error.error && error.error.errors) {
            this.handleValidationErrors(error.error.errors);
          } */
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
      documenti: this.selectedFiles
        .filter(file => file.name.toLowerCase().endsWith('.pdf'))
        .map(file => ({
          nomeFile: file.name,
          // tipoDocumento: 'DOCUMENTO_PDF'
        }))
    };
  
    formData.append(
      'contratto',
      new Blob([JSON.stringify(contratto)], { type: 'application/json' }),
      'contratto.json'
    );
  

    this.selectedFiles
      .filter(file => file.name.toLowerCase().endsWith('.pdf'))
      .forEach(file => {
        formData.append('documenti', file, file.name);
      });
  
    return formData;
  }

  private handleError(error: any) : string{
    switch (error.status) {
      case 400:
        return this.errorMsg = 'Dati non validi. Controlla i campi obbligatori.';
      case 422:
        return this.errorMsg = 'Dati non validi o contratto già esistente.';
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = 'Errore durante il salvataggio del contratto.';
    }
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

  indietro() {
    this.router.navigate(['/contratti-locazione']);
  }

  resetForm(form: any) {
    form.reset();
  }


  }




