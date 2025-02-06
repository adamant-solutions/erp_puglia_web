import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Imprese } from 'src/app/core/models/manutenzione.model';
import { ImpreseService } from 'src/app/core/services/manutenzione-services/imprese.service';

@Component({
  selector: 'app-dettagli-imprese',
  templateUrl: './dettagli-imprese.component.html',
  styleUrls: ['./dettagli-imprese.component.css']
})
export class DettagliImpreseComponent {
  pageTitle: string = 'Visualizza Imprese';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Imprese', link: '/manutenzione/imprese' },
  ];
  viewForm!: FormGroup;
  impresa: Imprese = {
    id: 0,
    ragioneSociale: '',
    partitaIva: '',
    codiceFiscale: '',
    indirizzo: '',
    citta: '',
    provincia: '',
    cap: '',
    telefono: '',
    email: '',
    pec: ''
  }

  private router = inject(Router);
  private route = inject(ActivatedRoute);


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
 
    this.route.data.subscribe(({ data }) => {
      this.impresa = data
      this.initForm();
    })


  }

  initForm() {
    this.viewForm = this.fb.group({
      ragioneSociale: [this.impresa.ragioneSociale],
      partitaIva: [this.impresa.partitaIva],
      codiceFiscale: [this.impresa.codiceFiscale],
      indirizzo: [this.impresa.indirizzo],
      citta: [this.impresa.citta],
      provincia: [this.impresa.provincia],
      cap: [this.impresa.cap],
      telefono: [this.impresa.telefono],
      email: [this.impresa.email],
      pec: [this.impresa.pec],
    });

    this.viewForm.disable();
  }

  indietro() {
    this.router.navigate(['/manutenzione/imprese']);
  }

}
