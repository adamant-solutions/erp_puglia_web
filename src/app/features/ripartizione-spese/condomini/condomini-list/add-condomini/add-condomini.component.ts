import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { comuni, provinces } from 'src/app/core/models/province-data.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CondominioService } from 'src/app/core/services/ripartizione-spese/condominio.service';

@Component({
  selector: 'app-add-condomini',
  templateUrl: './add-condomini.component.html',
  styleUrls: ['./add-condomini.component.css'],
})
export class AddCondominiComponent implements OnInit {
  addForm: FormGroup;
  breadcrumbList: any[] = [
    { label: 'ERP - di Regione Puglia', url: '/' },
    { label: 'Condomini', link: '/ripartizione-spese/condomini' },
  ];
  pageTitle = 'Nuovo condominio';
  submitted = false;
  errorMsg: string = '';

  provinces = [...provinces];
  comuni = [...comuni];

  filteredComuni: any[] = [];

  constructor(
    private fb: FormBuilder,
    private condominioService: CondominioService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.addForm = this.fb.group({
      codice: ['', Validators.required],
      denominazione: ['', [Validators.required, Validators.minLength(3)]],
      indirizzo: ['', [Validators.required, Validators.minLength(5)]],
      comune: ['', Validators.required],
      provincia: ['', Validators.required],
      cap: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      codiceFiscale: ['', Validators.required],
      version: [1],
    });
  }

  ngOnInit(): void {
    this.addForm
      .get('provincia')
      ?.valueChanges.subscribe((selectedProvincia) => {
        this.filteredComuni = this.comuni.filter(
          (comune) => comune.provincia === selectedProvincia
        );
        this.addForm.get('comune')?.reset();
      });
  }

  shouldShowError(fieldName: string): boolean {
    const field = this.addForm.get(fieldName);
    return field ? field.invalid && this.submitted : false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addForm.valid) {
      this.condominioService.createCondominio(this.addForm.value).subscribe({
        next: () => {
          this.notificationService.addNotification({
            message: 'Condominio salvato con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['ripartizione-spese/condomini']);
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: this.handleError(error),
            type: 'error',
            timeout: 5000,
          });
        },
      });
    }
  }

  private handleError(err: any): string {
    switch (err.status) {
      case 400:
        return 'Il codice fiscale deve essere composto da 11 cifre numeriche';
      case 422:
        return 'Dati non validi o condominio già esistente.';
      case 500:
        return err.error.message;
      default:
        return 'Errore durante il salvataggio del condominio.';
    }
  }

  onCapKeyPress(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  indietro(): void {
    this.router.navigate(['ripartizione-spese/condomini']);
  }
}
