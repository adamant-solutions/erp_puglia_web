import { Component } from '@angular/core';

@Component({
  selector: 'app-piani-conti-list',
  templateUrl: './piani-conti-list.component.html',
  styleUrls: ['./piani-conti-list.component.css']
})
export class PianiContiListComponent {
  pageTitle: string = 'Piano dei Conti';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
  ];
}
