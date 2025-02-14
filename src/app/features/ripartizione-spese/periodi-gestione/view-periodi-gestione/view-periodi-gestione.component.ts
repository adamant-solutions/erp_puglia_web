import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CondominioLight } from 'src/app/core/models/condominio-light.model';
import { PeriodiGestione } from 'src/app/core/models/periodi-gestione.model';

@Component({
  selector: 'app-view-periodi-gestione',
  templateUrl: './view-periodi-gestione.component.html',
  styleUrls: ['./view-periodi-gestione.component.css']
})
export class ViewPeriodiGestioneComponent {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Periodi di Gestione', link: '/periodi' }
  ];
  pageTitle = 'Visualizza Periodo di Gestione';
  viewForm: FormGroup;
  periodo?: PeriodiGestione;
  condominiList: CondominioLight[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
      private router: Router
   
  ) {
    this.viewForm = this.formBuilder.group({
      dataInizio: [{value: '', disabled: true}],
      dataFine: [{value: '', disabled: true}],
      stato: [{value: '', disabled: true}],
      condominioId: [{value: '', disabled: true}],
      note: [{value: '', disabled: true}],
      version: [{value: '', disabled: true}]
    });
  }
  ngOnInit(): void {
   
    this.route.data.subscribe({
      next: (data) => {
        if (data['periodo']) {
          this.periodo = data['periodo'];
          this.populateForm();
        }
        if (data['condomini']) {
          this.condominiList = data['condomini'];
        }
      }
    });
  }
  private populateForm(): void {
    if (this.periodo) {
      this.viewForm.patchValue({
        dataInizio: this.periodo.dataInizio,
        dataFine: this.periodo.dataFine,
        stato: this.periodo.stato,
        condominioId: this.periodo.condominioId,
        note: this.periodo.note,
        version: this.periodo.version
      });
    }
  }
  getCondominioName(id: number): string {
    const condominio = this.condominiList.find(c => c.id === id);
    return condominio ? condominio.denominazione : '';
  }

  indietro() {
    this.router.navigate(['ripartizione-spese/periodi-gestione']);
  }
}
