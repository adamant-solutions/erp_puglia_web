import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { Morosita } from 'src/app/core/models/morosita.model';
import { MorositaService } from 'src/app/core/services/morosita.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-morosita',
  templateUrl: './edit-morosita.component.html',
  styleUrls: ['./edit-morosita.component.css']
})
export class EditMorositaComponent implements OnInit {
  editForm: FormGroup;
  contratti: ModelLight[] = [];
  initialFormValues: any;
  morositaId!: number;
  formSubmitAttempted = false;
  errorMsg = '';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Morosità', link: '/morosita' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private morositaService: MorositaService,
    private notifService: NotificationService
  ) {
    this.editForm = this.fb.group({
      contrattoId: ['', Validators.required],
      dataRilevazione: ['', Validators.required],
      dataScadenza: ['', Validators.required],
      importoDovuto: ['', [Validators.required, Validators.min(0)]],
      importoVersato: ['', [Validators.required, Validators.min(0)]],
      importoMorosita: ['', [Validators.required, Validators.min(0)]],
      stato: ['', Validators.required],
      tentativiContatto: ['', [Validators.required, Validators.min(0)]],
      modalitaContatto: ['', Validators.required],
      esitoContatto: ['', Validators.required],
      note: ['']
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.contratti = data['contrattiLightResolver'] as ModelLight[];

      if (data['morositaByIdResolver']) {
        const morosita: Morosita = data['morositaByIdResolver'];
        this.morositaId = morosita.id;
        this.populateForm(morosita);
        this.initialFormValues = this.editForm.value;
      }
    });
  }

  private populateForm(morosita: Morosita): void {
    this.editForm.patchValue({
      ...morosita,
    });
  }

  resetForm(): void {
    if (this.initialFormValues) {
      this.editForm.patchValue(this.initialFormValues);
      Object.keys(this.editForm.controls).forEach(key => {
        const control = this.editForm.get(key);
        control?.markAsUntouched();
        control?.markAsPristine();
      });
      this.formSubmitAttempted = false;
    }
  }

  onContrattoChange(event: any): void {
    const selectedId = event.target.value;
    const contratto = this.contratti.find(c => c.id === Number(selectedId));
    if (contratto) {
      this.editForm.patchValue({
        contrattoId: contratto.id,
        contrattoDescrizione: contratto.descrizione
      });
    }
  }

  showValidationErrors(): void {
    this.formSubmitAttempted = true;
    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  onSubmit(): void {
    this.formSubmitAttempted = true;
  
    if (this.editForm.valid) {
      const formValues = this.editForm.value;
      const updatedMorosita: Morosita = {
        id: this.morositaId,
        ...formValues
      };
  
      this.morositaService.updateMorosita(this.morositaId, updatedMorosita)
        .subscribe({
          next: () => {
            this.notifService.addNotification({
              message: 'Morosità è stato salvato con successo!',
              type: 'success',
              timeout: 3000,
            });
            this.router.navigate(['/morosita']);
          },
          error: (error) => {
            this.notifService.addNotification({
              message:  this.handleError(error.error),
              type: 'error',
              timeout: 5000,
            }); 
          }
        });
    }
  }

  private handleError(error: any): string{
    return this.errorMsg = error.status === 400 ? 'Dati non validi' : 
                    error.status === 500 ? error.message :
                    error.status === 409 ? error.message :
                    error.status === 422 ? 'Morosità già esistente' :
                    'Errore durante il salvataggio';
  }

  shouldShowError(controlName: string): boolean {
    const control = this.editForm.get(controlName);
    return !!(control && control.invalid && (control.touched || this.formSubmitAttempted));
  }

  indietroM(): void {
    this.router.navigate(['/morosita']);
  }
}