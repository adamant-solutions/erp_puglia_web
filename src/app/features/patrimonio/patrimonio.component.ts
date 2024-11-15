import { Component } from '@angular/core';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.css'],
})
export class PatrimonioComponent {
  pageTitle: string = 'Patrimonio';

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
}
