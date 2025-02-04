import { Component } from '@angular/core';

@Component({
  selector: 'app-view-interventi',
  templateUrl: './view-interventi.component.html',
  styleUrls: ['./view-interventi.component.css']
})
export class ViewInterventiComponent {
  pageTitle: string = 'Interventi';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];
}
