import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Morosita } from 'src/app/core/models/morosita.model';

@Component({
  selector: 'app-view-morosita',
  templateUrl: './view-morosita.component.html',
  styleUrls: ['./view-morosita.component.css']
})
export class ViewMorositaComponent implements OnInit {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Morosità', link: '/morosita' },
  ];

  viewForm = this.fb.group({
    contrattoId: [''],
    dataRilevazione: [''],
    dataScadenza: [''],
    importoDovuto: [''],
    importoVersato: [''],
    importoMorosita: [''],
    stato: [''],
    tentativiContatto: [''],
    modalitaContatto: [''],
    esitoContatto: [''],
    note: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const morosita = data['morositaByIdResolver'] as Morosita;
      console.log(morosita)
      if (morosita) {
        this.populateForm(morosita);
      }
    });
  }

  private populateForm(morosita: Morosita) {
    this.viewForm.patchValue({
      contrattoId: morosita.contrattoId?.toString(),
      dataRilevazione: this.formatDate(morosita.dataRilevazione),
      dataScadenza: this.formatDate(morosita.dataScadenza),
      importoDovuto: morosita.importoDovuto?.toString(),
      importoVersato: morosita.importoVersato?.toString(),
      importoMorosita: morosita.importoMorosita?.toString(),
      stato: morosita.stato,
      tentativiContatto: morosita.tentativiContatto?.toString(),
      modalitaContatto: morosita.modalitaContatto,
      esitoContatto: morosita.esitoContatto,
      note: morosita.note
    });
  }

  private formatDate(dateString?: string): string {
    return dateString ? new Date(dateString).toLocaleDateString() : '';
  }

  indietroM() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/morosita']);
  }
}