import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Piani } from 'src/app/core/models/manutenzione.model';

@Component({
  selector: 'app-dettagli-piani',
  templateUrl: './dettagli-piani.component.html',
  styleUrls: ['./dettagli-piani.component.css']
})
export class DettagliPianiComponent {

  pageTitle: string = 'Visualizza Piano';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Piani', link: '/manutenzione/piani' },
  ];
  viewForm!: FormGroup;
  piano: Piani = {
    id: 0,
    anno: '',
    descrizione: '',
    budgetTotale: 0,
    budgetUtilizzato: 0,
    budgetResiduo: 0,
    note: ''
  }

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor(private fb: FormBuilder,private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.route.data.subscribe(({ data }) => {
      this.piano = data
      this.initForm();
    })
  }

  initForm() {
    const dataFormatted = this.datePipe.transform(this.piano.dataApprovazione, 'dd/MM/yyyy')
    this.viewForm = this.fb.group({
      anno: [this.piano.anno],
      descrizione: [this.piano.descrizione],
      budgetTotale: [this.piano.budgetTotale],
      budgetUtilizzato: [this.piano.budgetUtilizzato],
      budgetResiduo: [this.piano.budgetResiduo],
      dataApprovazione: [dataFormatted],
      note: [this.piano.note],
    });

    this.viewForm.disable();
  }  

  indietro() {
    this.router.navigate(['/manutenzione/piani']);
  }
}
