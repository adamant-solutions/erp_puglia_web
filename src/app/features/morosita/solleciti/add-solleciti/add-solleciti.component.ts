import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private sollecitoService: SollecitoService,
    private route: ActivatedRoute,
    private router: Router
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
      esitoInvio: [''],
      esitoRisposta: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.sollecitoService.createSollecito(this.morositaId, this.addForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error) => {
            console.error('Error creating sollecito:', error);
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
      esitoInvio: '',
      esitoRisposta: ''
    });
  }

  indietro() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}