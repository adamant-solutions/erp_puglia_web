import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoGestioneService } from 'src/app/core/services/ripartizione-spese/periodi-gestione.service';
import { CondominioLight } from 'src/app/core/models/condominio-light.model';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-periodo-gestione',
  templateUrl: './add-periodi-gestione.component.html',
  styleUrls: ['./add-periodi-gestione.component.css']
})
export class AddPeriodoGestioneComponent implements OnInit {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Periodi di Gestione', link: '/ripartizione-spese/periodi-gestione' }
  ];
  
  pageTitle = 'Nuovo Periodo di Gestione';
  addForm: FormGroup;
  condominiList: CondominioLight[] = [];
  submitted = false;
  errorMsg: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private periodoService: PeriodoGestioneService,
    private notifService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.addForm = this.formBuilder.group({
      dataInizio: ['', [Validators.required]],
      dataFine: ['', [Validators.required]],
      stato: [{value: 'PREVENTIVO', disabled: true}],  
      condominioId: ['', [Validators.required]],
      note: [''],
      version: [1]
    }, { validator: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        if (data['condomini']) {
          this.condominiList = data['condomini'];
        }
      },
      error: (error) => {
        this.condominiList = [];
      }
    });
  }

  dateRangeValidator(group: FormGroup) {
    const dataInizio = group.get('dataInizio')?.value;
    const dataFine = group.get('dataFine')?.value;
    
    if (dataInizio && dataFine) {
      const start = new Date(dataInizio);
      const end = new Date(dataFine);
      
      if (start > end) {
        return { dateRange: true };
      }
    }
    return null;
  }

  
  shouldShowError(fieldName: string): boolean {
    const field = this.addForm.get(fieldName);
    return field ? (field.invalid && this.submitted) : false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addForm.invalid) {
      Object.keys(this.addForm.controls).forEach(key => {
        const control = this.addForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    const periodoData = this.addForm.getRawValue();
    this.periodoService.createPeriodo(periodoData).subscribe({
      next: (response) => {
        this.notifService.addNotification({
          message: 'Periodo gestione salvato con successo!',
          type: 'success',
          timeout: 3000,
        });
        this.router.navigate(['ripartizione-spese/periodi-gestione']);
      },
      error: (error) => {
        this.notifService.addNotification({
          message: this.handleError(error.error),
          type: 'error',
          timeout: 5000,
        });
      }
    });
  }

  private handleError(error: any) : string{
    switch (error.status) {
      case 400:
        return this.errorMsg = '';
      case 422:
        return this.errorMsg = ''; 
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = '';
    }
  }

  indietro(): void {
    this.location.back();
  }


  get dataInizio() { return this.addForm.get('dataInizio'); }
  get dataFine() { return this.addForm.get('dataFine'); }
  get stato() { return this.addForm.get('stato'); }
  get condominioId() { return this.addForm.get('condominioId'); }
  get note() { return this.addForm.get('note'); }

  getDateRangeError(): string {
    return this.submitted && this.addForm.errors?.['dateRange'] 
      ? 'La data di fine deve essere successiva alla data di inizio'
      : '';
  }
}