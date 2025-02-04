import { Component } from '@angular/core';

@Component({
  selector: 'app-view-appalti',
  templateUrl: './view-appalti.component.html',
  styleUrls: ['./view-appalti.component.css']
})
export class ViewAppaltiComponent {
  pageTitle: string = 'Richieste manutenzione';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];
}
