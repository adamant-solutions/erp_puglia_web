import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoceSpesaService } from 'src/app/core/services/ripartizione-spese/voce-spesa.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-view-voci-spesa',
  templateUrl: './view-voci-spesa.component.html',
  styleUrls: ['./view-voci-spesa.component.css']
})
export class ViewVociSpesaComponent implements OnInit {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Voci Spesa', link: '/ripartizione-spese/voci-spesa' }
  ];
  
  viewForm!: FormGroup;
  voceSpesa: any;
  quote: any[] = [];
  periodi: any[] = [];
  tipiSpesaOptions = [
    { value: 'SERVIZI', label: 'Servizi' },
    { value: 'RISCALDAMENTO', label: 'Riscaldamento' },
    { value: 'ASCENSORE', label: 'Ascensore' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.initializeForm();
  }

  private initializeForm() {
    this.viewForm = this.fb.group({
      descrizione: [{value: '', disabled: true}],
      tipoSpesa: [{value: '', disabled: true}],
      importoPreventivo: [{value: '', disabled: true}],
      importoConsuntivo: [{value: '', disabled: true}],
      importoConguaglio: [{value: '', disabled: true}],
      periodoId: [{value: '', disabled: true}],
      note: [{value: '', disabled: true}]
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
        this.quote = resolvedData.quote || [];

        if (this.voceSpesa) {
          this.viewForm.patchValue({
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

  indietro() {
    this.router.navigate(['ripartizione-spese/voci-spesa']);
  }
}