import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MorositaService } from 'src/app/core/services/morosita.service';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-morosita',
  templateUrl: './add-morosita.component.html',
  styleUrls: ['./add-morosita.component.css'],
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
    { value: 'SOSPESA', label: 'Sospesa' },
  ];
  modalitaContattoOptions = [
    { value: 'TELEFONO', label: 'Telefono' },
    { value: 'EMAIL', label: 'E-mail' },
    { value: 'SMS', label: 'SMS' },
  ];
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Morosità', link: '/morosita' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private morositaService: MorositaService,
    private notifService: NotificationService
  ) {
    this.morositaForm = this.initForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
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
      modalitaContatto: ['', [Validators.required]],
      esitoContatto: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.morositaForm.valid) {
      const formData = this.morositaForm.value;
      this.morositaService.addMorosita(formData).subscribe({
        next: () => {
          this.notifService.addNotification({
            message: 'Morosità salvata con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['/morosita']);
        },
        error: (error) => {
          this.notifService.addNotification({
            message: this.handleError(error.error),
            type: 'error',
            timeout: 5000,
          });
        },
      });
    }
  }

  private handleError(error: any): string {
    return (this.errorMsg =
      error.status === 400
        ? 'Dati non validi'
        : error.status === 500
        ? error.message
        : error.status === 409
        ? error.message
        : error.status === 422
        ? 'Morosità già esistente'
        : 'Errore durante il salvataggio');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.morositaForm.get(fieldName);
    return field ? this.submitted && field.invalid : false;
  }
}
