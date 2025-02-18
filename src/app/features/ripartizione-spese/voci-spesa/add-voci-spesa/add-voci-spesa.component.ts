import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoLight } from 'src/app/core/models/periodi-gestione.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VoceSpesaService } from 'src/app/core/services/ripartizione-spese/voce-spesa.service';

export enum TipoSpesa {
  SERVIZI = 'SERVIZI',
  RISCALDAMENTO = 'RISCALDAMENTO',
  ASCENSORE = 'ASCENSORE'
}

const tipiSpesaOptions = [
  { value: TipoSpesa.SERVIZI, label: 'Servizi' },
  { value: TipoSpesa.RISCALDAMENTO, label: 'Riscaldamento' },
  { value: TipoSpesa.ASCENSORE, label: 'Ascensore' }
];

@Component({
  selector: 'app-add-voci-spesa',
  templateUrl: './add-voci-spesa.component.html',
  styleUrls: ['./add-voci-spesa.component.css']
})
export class AddVociSpesaComponent implements OnInit {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Voci Spesa', link: '/spese' }
  ];

  addForm!: FormGroup;
  submitted = false;
  tipiSpesaOptions = tipiSpesaOptions;
  errorMsg: string = '';
  periodi: PeriodoLight[] = [];

  constructor(
    private fb: FormBuilder,
    private vociSpesaService: VoceSpesaService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.periodi = this.route.snapshot.data['periodi'];
    this.addForm = this.fb.group({
      descrizione: ['', Validators.required],
      tipoSpesa: ['', Validators.required],
      importoPreventivo: ['', [Validators.required, Validators.min(0)]],
      importoConsuntivo: [''],
      importoConguaglio: [''],
      periodoId: ['', Validators.required],
      note: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.vociSpesaService.createVoceSpesa(this.addForm.value)
        .subscribe({
          next: () => {
            this.notificationService.addNotification({
              message: 'Voce spesa creata con successo',
              type: 'success',
              timeout: 5000,
            });
            this.router.navigate(['../'], { relativeTo: this.route });
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

  resetForm() {
    this.submitted = false;
    this.addForm.reset({
      descrizione: '',
      tipoSpesa: '',
      importoPreventivo: '',
      importoConsuntivo: '',
      importoConguaglio: '',
      periodoId: '',
      note: ''
    });
  }

  private handleError(error: any): string {
    switch (error.status) {
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = 'Errore durante il salvataggio della voce spesa.';
    }
  }

  indietro() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}