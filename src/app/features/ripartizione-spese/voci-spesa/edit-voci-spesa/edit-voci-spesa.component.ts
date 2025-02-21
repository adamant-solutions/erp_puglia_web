import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoceSpesaService } from 'src/app/core/services/ripartizione-spese/voce-spesa.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-voci-spesa',
  templateUrl: './edit-voci-spesa.component.html',
  styleUrls:['./edit-voci-spesa.component.css']
})
export class EditVociSpesaComponent implements OnInit {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Voci Spesa', link: '/ripartizione-spese/voci-spesa' }
  ];
  quote: any[] = [];
  voceSpesa: any;
  unitaDisponibili: any[] = [];
  periodi: any[] = [];
  modifyForm!: FormGroup;
  submitted = false;
  tipiSpesaOptions = [
    { value: 'SERVIZI', label: 'Servizi' },
    { value: 'RISCALDAMENTO', label: 'Riscaldamento' },
    { value: 'ASCENSORE', label: 'Ascensore' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private voceSpesaService: VoceSpesaService,
    private notificationService: NotificationService
  ) {
    this.initializeForm();
  }

  private initializeForm() {
    this.modifyForm = this.fb.group({
      descrizione: ['', Validators.required],
      tipoSpesa: ['', Validators.required],
      importoPreventivo: ['', [Validators.required, Validators.min(0)]],
      importoConsuntivo: [''],
      importoConguaglio: [''],
      periodoId: ['', Validators.required],
      note: ['']
    });
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        const resolvedData = data['resolvedData'];
        if (!resolvedData) {
          this.notificationService.addNotification({
            message: 'Errore nel caricamento dei dati',
            type: 'error',
            timeout: 5000
          });
          return;
        }

        this.voceSpesa = resolvedData.voceSpesa;
        this.periodi = resolvedData.periodi;
        this.unitaDisponibili = resolvedData.unita || [];
        this.quote = resolvedData.quote || [];

      
        if (this.voceSpesa) {
          this.modifyForm.patchValue({
            descrizione: this.voceSpesa.descrizione || '',
            tipoSpesa: this.voceSpesa.tipoSpesa || '',
            importoPreventivo: this.voceSpesa.importoPreventivo || '',
            periodoId: this.voceSpesa.periodoId || '',
            importoConsuntivo: this.voceSpesa.importoConsuntivo || '',
            importoConguaglio: this.voceSpesa.importoConguaglio || '',
            note: this.voceSpesa.note || ''
          });
        }
      },
      error: (error) => {
  
        this.notificationService.addNotification({
          message: 'Errore nel caricamento dei dati',
          type: 'error',
          timeout: 5000
        });
      }
    });
  }

  onAddQuota(unita: any) {
    if (!this.voceSpesa?.id || !unita.millesimi) {
      this.notificationService.addNotification({
        message: 'Dati mancanti per l\'aggiunta della quota',
        type: 'error',
        timeout: 5000
      });
      return;
    }

    const newQuota = {
      unitaImmobiliareId: unita.id,
      millesimi: unita.millesimi
    };

    this.voceSpesaService.addQuota(this.voceSpesa.id, newQuota).subscribe({
      next: (response) => {
        const index = this.unitaDisponibili.findIndex(u => u.id === unita.id);
        if (index !== -1) {
          this.unitaDisponibili[index] = {
            ...this.unitaDisponibili[index],
            quotaId: response.id
          };
        }

        this.notificationService.addNotification({
          message: 'Quota aggiunta con successo',
          type: 'success',
          timeout: 5000
        });
      },
      error: (error) => {
   
        this.notificationService.addNotification({
          message: 'Errore durante l\'aggiunta della quota',
          type: 'error',
          timeout: 5000
        });
      }
    });
  }

  onUpdateQuota(unita: any) {
    if (!this.voceSpesa?.id || !unita.millesimi || !unita.quotaId) {
      this.notificationService.addNotification({
        message: 'Dati mancanti per la modifica della quota',
        type: 'error',
        timeout: 5000
      });
      return;
    }

    const updatedQuota = {
      unitaImmobiliareId: unita.id,
      millesimi: unita.millesimi
    };

    this.voceSpesaService.updateQuota(this.voceSpesa.id, unita.quotaId, updatedQuota).subscribe({
      next: () => {
        this.notificationService.addNotification({
          message: 'Quota modificata con successo',
          type: 'success',
          timeout: 5000
        });
      },
      error: (error) => {
  
        this.notificationService.addNotification({
          message: 'Errore durante la modifica della quota',
          type: 'error',
          timeout: 5000
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.modifyForm.valid) {
      this.notificationService.addNotification({
        message: 'Compilare tutti i campi obbligatori',
        type: 'error',
        timeout: 5000
      });
      return;
    }

    if (!this.voceSpesa) {
      this.notificationService.addNotification({
        message: 'Dati della voce spesa mancanti',
        type: 'error',
        timeout: 5000
      });
      return;
    }

    const updatedVoceSpesa = {
      ...this.voceSpesa,
      ...this.modifyForm.value,
      importoConsuntivo: this.modifyForm.value.importoConsuntivo || undefined,
      importoConguaglio: this.modifyForm.value.importoConguaglio || undefined,
      note: this.modifyForm.value.note || undefined
    };

    this.voceSpesaService.updateVoceSpesa(updatedVoceSpesa).subscribe({
      next: () => {
        this.notificationService.addNotification({
          message: 'Voce spesa modificata con successo',
          type: 'success',
          timeout: 5000
        });
        this.router.navigate(['ripartizione-spese/voci-spesa']);
      },
      error: (error) => {
     
        this.notificationService.addNotification({
          message: 'Errore durante il salvataggio della voce spesa',
          type: 'error',
          timeout: 5000
        });
      }
    });
  }

  indietro() {
    this.router.navigate(['ripartizione-spese/voci-spesa']);
  }

  editQuota(quota: any) {
    if (!this.voceSpesa?.id || !quota.millesimi || !quota.id) {
      this.notificationService.addNotification({
        message: 'Dati mancanti per la modifica della quota',
        type: 'error',
        timeout: 5000
      });
      return;
    }

    const updatedQuota = {
      unitaImmobiliareId: quota.unitaImmobiliareId,
      millesimi: quota.millesimi
    };

    this.voceSpesaService.updateQuota(this.voceSpesa.id, quota.id, updatedQuota).subscribe({
      next: () => {
        this.notificationService.addNotification({
          message: 'Quota modificata con successo',
          type: 'success',
          timeout: 5000
        });
        this.refreshQuote();
      },
      error: (error) => {
        this.notificationService.addNotification({
          message: 'Errore durante la modifica della quota',
          type: 'error',
          timeout: 5000
        });
      }
    });
  }

  private refreshQuote() {
    if (this.voceSpesa?.id) {
      this.voceSpesaService.getQuote(this.voceSpesa.id).subscribe({
        next: (quote) => {
          this.quote = quote;
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: 'Errore durante il caricamento delle quote',
            type: 'error',
            timeout: 5000
          });
        }
      });
    }
  }

  deleteQuota(quota: any) {
   
  }
  viewUnitaDetails(unita: any) {

  }
  addNewQuota() {
   
  }
}