import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CondominioService } from 'src/app/core/services/ripartizione-spese/condominio.service';

@Component({
  selector: 'app-add-condomini',
  templateUrl: './add-condomini.component.html',
  styleUrls: ['./add-condomini.component.css']
})
export class AddCondominiComponent {
  addForm: FormGroup;
  breadcrumbList: any[] = [
    { label: 'Home', url: '/' },
    { label: 'Condomini', url: 'ripartizione-spese/condomini' },
    
  ];
  pageTitle = 'Nuovo condominio';
  submitted = false;
  errorMsg: string = ''
  constructor(
    private fb: FormBuilder,
    private condominioService: CondominioService,
    private router: Router,
    private notificationService:NotificationService
  ) {
    this.addForm = this.fb.group({
      codice: ['', Validators.required],
      denominazione: ['', Validators.required],
      indirizzo: ['', Validators.required],
      comune: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.maxLength(2)]],
      cap: ['', Validators.required],
      codiceFiscale: ['', Validators.required],
      version: [1]
    });
  }

  shouldShowError(fieldName: string): boolean {
    const field = this.addForm.get(fieldName);
    return field ? field.invalid && this.submitted : false;
  }

  onSubmit(): void {
    this.submitted = true; 

    if (this.addForm.valid) {
      this.condominioService.createCondominio(this.addForm.value)
        .subscribe({
          next: () => {
            this.notificationService.addNotification({
              message: 'Condominio è stato salvato con successo!',
              type: 'success',
              timeout: 3000,
            });
            this.router.navigate(['ripartizione-spese/condomini']);
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

  private handleError(error: any) : string{
    switch (error.status) {
      case 400:
        return this.errorMsg = 'Dati non validi. Controlla i campi obbligatori.';
      case 422:
        return this.errorMsg = 'Dati non validi o condominio già esistente.';
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = 'Errore durante il salvataggio del condominio.';
    }
  }

  indietro(): void {
    this.router.navigate(['ripartizione-spese/condomini']);
  }
}

