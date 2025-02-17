import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodiGestione } from 'src/app/core/models/periodi-gestione.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PeriodoGestioneService } from 'src/app/core/services/ripartizione-spese/periodi-gestione.service';

@Component({
  selector: 'app-edit-periodi-gestione',
  templateUrl: './edit-periodi-gestione.component.html',
  styleUrls: ['./edit-periodi-gestione.component.css']
})
export class EditPeriodiGestioneComponent implements OnInit {
  periodoForm: FormGroup;
  periodoId!: number;
  formSubmitted = false; 
  
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Periodi di Gestione', link: '/ripartizione-spese/periodi-gestione' }
  ];

  validationMessages = {
    dataInizio: 'Data Inizio obbligatoria',
    dataFine: 'Data Fine obbligatoria',
    stato: 'Stato obbligatorio'
  };
  errorMsg: string = ''

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private periodoService: PeriodoGestioneService,
    private notificationService:NotificationService
  ) {
    this.periodoForm = this.fb.group({
      dataInizio: ['', Validators.required],
      dataFine: ['', Validators.required],
      stato: [{value: '', disabled: true}, Validators.required],
      note: [''],
      condominioId: ['', Validators.required],
      version: ['', Validators.required]
    });
  }


  isFieldInvalid(fieldName: string): boolean {
    const field = this.periodoForm.get(fieldName);
    return field ? (field.invalid && this.formSubmitted) : false;
  }

  getErrorMessage(fieldName: string): string {
    return this.validationMessages[fieldName as keyof typeof this.validationMessages] || '';
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        if (data['periodoByIdResolver']) {
          const periodo = data['periodoByIdResolver'];
          this.periodoId = periodo.id;
          
          const dataInizio = periodo.dataInizio ? new Date(periodo.dataInizio).toISOString().split('T')[0] : '';
          const dataFine = periodo.dataFine ? new Date(periodo.dataFine).toISOString().split('T')[0] : '';
          
          this.periodoForm.patchValue({
            dataInizio: dataInizio,
            dataFine: dataFine,
            stato: periodo.stato,
            note: periodo.note,
            condominioId: periodo.condominioId,
            version: periodo.version
          });
        }
      },
      error: (error) => {
    
      }
    });
  }

  onAvanzaStato() {
    if (this.periodoId) {
      this.periodoService.avanzaStato(this.periodoId).subscribe({
        next: (response) => {
   
          this.periodoForm.patchValue({
            stato: response.stato
          });
          
          this.notificationService.addNotification({
            message: 'Stato avanzato con successo!',
            type: 'success',
            timeout: 3000,
          });
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: this.handleError(error.error),
            type: 'error',
            timeout: 5000,
          });
        }
      });
    }
  }

  onSubmit() {
    this.formSubmitted = true; 
    
    if (this.periodoForm.invalid) {
      return; 
    }

    const formValue = this.periodoForm.getRawValue();
    const periodoData: PeriodiGestione = {
      id: this.periodoId,
      dataInizio: formValue.dataInizio,
      dataFine: formValue.dataFine,
      stato: formValue.stato,
      note: formValue.note,
      condominioId: formValue.condominioId,
      version: formValue.version
    };

    this.periodoService.updatePeriodo(this.periodoId, periodoData).subscribe({
      next: () => {
        this.notificationService.addNotification({
          message: 'Salvato con successo!',
          type: 'success',
          timeout: 3000,
        });
        this.router.navigate(['ripartizione-spese/periodi-gestione']);
      },
      error: (error) => {
        this.notificationService.addNotification({
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
        return this.errorMsg = error.message;
      case 422:
        return this.errorMsg = ''; 
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = '';
    }
  }

  onCancel() {
    this.router.navigate(['ripartizione-spese/periodi-gestione']);
  }
}