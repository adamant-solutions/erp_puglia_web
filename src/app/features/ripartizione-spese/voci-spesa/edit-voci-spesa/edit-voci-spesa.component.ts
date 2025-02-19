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
    { label: 'Voci Spesa', link: '/spese' }
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
}
