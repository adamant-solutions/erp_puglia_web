import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SollecitoService } from 'src/app/core/services/sollecito.service';


export enum TipoSollecito {
  BONARIO = 'BONARIO',
  RACCOMANDATA = 'RACCOMANDATA',
  DIFFIDA = 'DIFFIDA',
  LEGALE = 'LEGALE'
}

export enum EsitoInvioSollecito {
  CONSEGNATO = 'CONSEGNATO',
  NON_CONSEGNATO = 'NON_CONSEGNATO',
  RIFIUTATO = 'RIFIUTATO',
  IN_CONSEGNA = 'IN_CONSEGNA',
  SMARRITO = 'SMARRITO'
}


const tipiSollecitoOptions = [
  { value: TipoSollecito.BONARIO, label: 'Bonario' },
  { value: TipoSollecito.RACCOMANDATA, label: 'Raccomandata' },
  { value: TipoSollecito.DIFFIDA, label: 'Diffida' },
  { value: TipoSollecito.LEGALE, label: 'Legale' }
];

const esitiInvioOptions = [
  { value: EsitoInvioSollecito.CONSEGNATO, label: 'Consegnato' },
  { value: EsitoInvioSollecito.NON_CONSEGNATO, label: 'Non Consegnato' },
  { value: EsitoInvioSollecito.RIFIUTATO, label: 'Rifiutato' },
  { value: EsitoInvioSollecito.IN_CONSEGNA, label: 'In Consegna' },
  { value: EsitoInvioSollecito.SMARRITO, label: 'Smarrito' }
];

@Component({
  selector: 'app-add-solleciti',
  templateUrl: './add-solleciti.component.html',
  styleUrls: ['./add-solleciti.component.css']
})
export class AddSollecitiComponent implements OnInit {


  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
  ];
  
  addForm!: FormGroup;
  submitted = false;
  morositaId!: number;
  

  tipiSollecitoOptions = tipiSollecitoOptions;
  esitiInvioOptions = esitiInvioOptions;
  errorMsg: string = ''

  constructor(
    private fb: FormBuilder,
    private sollecitoService: SollecitoService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService:NotificationService
  ) {}

  ngOnInit() {
    this.morositaId = Number(this.route.parent?.snapshot.paramMap.get('id'));
      this.breadcrumbList = [
      { label: 'ERP - di Regione Puglia', link: '/' },
      { label: 'Morosità', link: '/morosita' },
      { label: 'Dettagli Morosità', link: `/morosita/view-morosita/${this.morositaId}` },
      {label:'Solleciti', link:`/morosita/view-morosita/${this.morositaId}/solleciti`}
    ];
    this.addForm = this.fb.group({
      tipoSollecito: ['', Validators.required],
      dataInvio: ['', Validators.required],
      dataScadenza: ['', Validators.required],
      note: [''],
      esitoInvio: [null],
      esitoRisposta: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
    
      const formData = { ...this.addForm.value };
      
    
      if (formData.esitoInvio === '') {
        formData.esitoInvio = null;
      }

      this.sollecitoService.createSollecito(this.morositaId, formData)
        .subscribe({
          next: () => {
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
      tipoSollecito: '',
      dataInvio: '',
      dataScadenza: '',
      note: '',
      esitoInvio: null,  // Reset to null instead of empty string
      esitoRisposta: ''
    });
  }

  private handleError(error: any) : string{
    switch (error.status) {
     
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = 'Errore durante il salvataggio del sollecito.';
    }
  }

  indietro() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}