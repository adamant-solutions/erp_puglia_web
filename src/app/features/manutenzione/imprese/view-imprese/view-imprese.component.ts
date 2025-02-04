import { Component } from '@angular/core';

@Component({
  selector: 'app-view-imprese',
  templateUrl: './view-imprese.component.html',
  styleUrls: ['./view-imprese.component.css']
})
export class ViewImpreseComponent {
 
  pageTitle: string = 'Imprese';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];


  constructor() {

  }
  ngOnInit() {
  }
}
