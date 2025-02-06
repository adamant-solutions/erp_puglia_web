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
  
  tipiSollecito = Object.values(TipoSollecito);
  esitiInvio = Object.values(EsitoInvioSollecito);

  constructor(
    private fb: FormBuilder,
    private sollecitoService: SollecitoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.morositaId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    
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
    this.addForm.reset();
  }

  indietro() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}