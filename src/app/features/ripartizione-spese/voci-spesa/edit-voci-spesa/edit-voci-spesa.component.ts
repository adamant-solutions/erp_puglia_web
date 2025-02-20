import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoLight } from 'src/app/core/models/periodi-gestione.model';
import { VoceSpesaDTO } from 'src/app/core/models/voce-spesa.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VoceSpesaService } from 'src/app/core/services/ripartizione-spese/voce-spesa.service';
import { TipoSpesa } from '../add-voci-spesa/add-voci-spesa.component';

@Component({
  selector: 'app-edit-voci-spesa',
  templateUrl: './edit-voci-spesa.component.html',
  styleUrls: ['./edit-voci-spesa.component.css']
})
export class EditVociSpesaComponent {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Voci Spesa', link: '/ripartizione-spese/voci-spesa' }
  ];

  modifyForm!: FormGroup;
  submitted = false;
   tipiSpesaOptions = [
    { value: TipoSpesa.SERVIZI, label: 'Servizi' },
    { value: TipoSpesa.RISCALDAMENTO, label: 'Riscaldamento' },
    { value: TipoSpesa.ASCENSORE, label: 'Ascensore' }
  ];
  errorMsg: string = '';
  periodi: PeriodoLight[] = [];
  voceSpesa!: VoceSpesaDTO;
  quotaSubmitted = false;
  isEditingQuota = false;
  currentQuotaId?: number;
  quotaForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private vociSpesaService: VoceSpesaService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {

    this.periodi = this.route.snapshot.data['periodi'];
    this.voceSpesa = this.route.snapshot.data['voceSpesaResolverID'];
    

    this.modifyForm = this.fb.group({
      descrizione: ['', Validators.required],
      tipoSpesa: ['', Validators.required],
      importoPreventivo: ['', [Validators.required, Validators.min(0)]],
      importoConsuntivo: [''],
      importoConguaglio: [''],
      periodoId: ['', Validators.required],
      note: ['']
    });

    
    if (this.voceSpesa) {

      const formValue = {
        descrizione: this.voceSpesa.descrizione,
        tipoSpesa: this.voceSpesa.tipoSpesa,
        importoPreventivo: this.voceSpesa.importoPreventivo,
        periodoId: this.voceSpesa.periodoId,
        importoConsuntivo: this.voceSpesa.importoConsuntivo ?? '',
        importoConguaglio: this.voceSpesa.importoConguaglio ?? '',
        note: this.voceSpesa.note ?? ''
      };

      this.modifyForm.patchValue(formValue);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.modifyForm.valid && this.voceSpesa) {

      const updatedVoceSpesa: VoceSpesaDTO = {
        ...this.voceSpesa,
        descrizione: this.modifyForm.value.descrizione,
        tipoSpesa: this.modifyForm.value.tipoSpesa,
        importoPreventivo: this.modifyForm.value.importoPreventivo,
        periodoId: this.modifyForm.value.periodoId,
      
        importoConsuntivo: this.modifyForm.value.importoConsuntivo || undefined,
        importoConguaglio: this.modifyForm.value.importoConguaglio || undefined,
        note: this.modifyForm.value.note || undefined
      };

      this.vociSpesaService.updateVoceSpesa(updatedVoceSpesa).subscribe({
        next: () => {
          this.notificationService.addNotification({
            message: 'Voce spesa modificata con successo',
            type: 'success',
            timeout: 5000,
          });
          this.router.navigate(['ripartizione-spese/voci-spesa']);
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

  private handleError(error: any): string {
    switch (error.status) {
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = 'Errore durante il salvataggio della voce spesa.';
    }
  }

  indietro() {
    this.router.navigate(['ripartizione-spese/voci-spesa']);
  }

  // onAddQuota() {
  //   this.quotaSubmitted = true;

  //   if (this.quotaForm.valid && this.voceSpesa?.id) {
  //     const newQuota: QuotaVoceSpesa = {
  //       idVoceSpesa: this.voceSpesa.id,
  //       descrizione: this.quotaForm.value.descrizione,
  //       millesimi: this.quotaForm.value.millesimi
  //     };

  //     this.vociSpesaService.addQuota(this.voceSpesa.id, newQuota).subscribe({
  //       next: (quota) => {
  //         this.quote.push(quota);
  //         this.quotaForm.reset();
  //         this.quotaSubmitted = false;
  //         this.notificationService.addNotification({
  //           message: 'Quota aggiunta con successo',
  //           type: 'success',
  //           timeout: 5000,
  //         });
  //       },
  //       error: (error) => {
  //         this.notificationService.addNotification({
  //           message: 'Errore durante l\'aggiunta della quota',
  //           type: 'error',
  //           timeout: 5000,
  //         });
  //       }
  //     });
  //   }
  // }

  // onEditQuota(quota: QuotaVoceSpesa) {
  //   this.isEditingQuota = true;
  //   this.currentQuotaId = quota.id;
  //   this.quotaForm.patchValue({
  //     descrizione: quota.descrizione,
  //     millesimi: quota.millesimi
  //   });
  // }

  // onUpdateQuota() {
  //   this.quotaSubmitted = true;

  //   if (this.quotaForm.valid && this.voceSpesa?.id && this.currentQuotaId) {
  //     const updatedQuota: QuotaVoceSpesa = {
  //       id: this.currentQuotaId,
  //       idVoceSpesa: this.voceSpesa.id,
  //       descrizione: this.quotaForm.value.descrizione,
  //       millesimi: this.quotaForm.value.millesimi
  //     };

  //     this.vociSpesaService.updateQuota(this.voceSpesa.id, this.currentQuotaId, updatedQuota).subscribe({
  //       next: (quota) => {
  //         const index = this.quote.findIndex(q => q.id === this.currentQuotaId);
  //         if (index !== -1) {
  //           this.quote[index] = quota;
  //         }
  //         this.resetQuotaForm();
  //         this.notificationService.addNotification({
  //           message: 'Quota modificata con successo',
  //           type: 'success',
  //           timeout: 5000,
  //         });
  //       },
  //       error: (error) => {
  //         this.notificationService.addNotification({
  //           message: 'Errore durante la modifica della quota',
  //           type: 'error',
  //           timeout: 5000,
  //         });
  //       }
  //     });
  //   }
  // }

  // onDeleteQuota(quotaId: number) {
  //   if (this.voceSpesa?.id) {
  //     this.vociSpesaService.deleteQuota(this.voceSpesa.id, quotaId).subscribe({
  //       next: () => {
  //         this.quote = this.quote.filter(q => q.id !== quotaId);
  //         this.notificationService.addNotification({
  //           message: 'Quota eliminata con successo',
  //           type: 'success',
  //           timeout: 5000,
  //         });
  //       },
  //       error: (error) => {
  //         this.notificationService.addNotification({
  //           message: 'Errore durante l\'eliminazione della quota',
  //           type: 'error',
  //           timeout: 5000,
  //         });
  //       }
  //     });
  //   }
  // }

  // resetQuotaForm() {
  //   this.quotaForm.reset();
  //   this.isEditingQuota = false;
  //   this.currentQuotaId = undefined;
  //   this.quotaSubmitted = false;
  // }
}
