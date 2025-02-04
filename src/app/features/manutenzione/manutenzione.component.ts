import {Component} from '@angular/core';

@Component({
  selector: 'app-manutenzione',
  templateUrl: './manutenzione.component.html',
  styleUrls: ['./manutenzione.component.css'],
})
export class ManutenzioneComponent {
  pageTitle: string = 'Manutenzione';
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
}
