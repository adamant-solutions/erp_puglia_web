import {Component} from '@angular/core';

@Component({
  selector: 'app-contabilita',
  templateUrl: './contabilita.component.html',
  styleUrls: ['./contabilita.component.css'],
})
export class ContabilitaComponent {
  pageTitle: string = 'Contabilità';
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  cards = [
    { title: 'Piano dei Conti' , link: 'piano-dei-conti'},
    { title: 'Contabilità Contratti Locazione' , link: 'contabilita-contratti'}
    //....
  ]
}
