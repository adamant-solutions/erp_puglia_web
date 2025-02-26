import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SituazioneCrediti } from 'src/app/core/models/contabilita/situazione-crediti.model';

@Component({
  selector: 'app-situazione-crediti',
  templateUrl: './situazione-crediti.component.html',
  styleUrls: ['./situazione-crediti.component.css']
})
export class SituazioneCreditiComponent {
  pageTitle: string = 'Situazione Crediti';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
    { label: 'Contratti locazione', link: '/contabilita/contabilita-contratti' },
  ];

  crediti: SituazioneCrediti[]= [];
  private route = inject(ActivatedRoute);

  constructor() { }
  ngOnInit() {
      this.getList();
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['data']
        this.crediti = response;
      }
      });
  }

  getStatoClass(stato: string): string {
    switch (stato) {
      case 'PAGATO':
        return 'badge text-success'; // Green
      case 'NON PAGATO':
        return 'badge text-danger'; // Red
      case 'PARZIALE':
        return 'badge text-warning'; // Yellow
      default:
        return 'badge text-secondary'; // Default gray
    }
  }
}
