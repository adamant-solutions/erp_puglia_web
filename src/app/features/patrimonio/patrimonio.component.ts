import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.css'],
})
export class PatrimonioComponent implements OnInit {
  pageTitle: string = 'Patrimonio';

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  patrimonioList: Patrimonio[] = [];

  patrimonio: Patrimonio | any = {
    comune: '',
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPatrimonioList();
  }

  getPatrimonioList() {
    // Load initial data from resolver
    this.activatedRoute.data
      .pipe(map((data) => data['patrimonioResolver']))
      .subscribe((response) => {
        console.log('Response from resolver:', response);
        this.patrimonioList = response;
      });
  }

  getDocumentTypes(documenti: any[]): string {
    return documenti.map((doc) => doc.tipoDocumento).join(', ');
  }

  deletePatrimonioModal(patrimonio: Patrimonio | any) {}

  getFilteredData() {}

  cancellaCerca() {}
}
