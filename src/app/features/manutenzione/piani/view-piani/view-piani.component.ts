import { Component } from '@angular/core';

@Component({
  selector: 'app-view-piani',
  templateUrl: './view-piani.component.html',
  styleUrls: ['./view-piani.component.css']
})
export class ViewPianiComponent {
  pageTitle: string = 'Piani';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];
}
