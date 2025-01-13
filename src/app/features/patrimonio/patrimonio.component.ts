import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private patrimonioService: PatrimonioService
  ) {}

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

  getFilteredData() {
    console.log('Data sent for filtering: ', `${this.patrimonio.comune}`);

    this.patrimonioService
      .getFilteredPatrimonio(this.patrimonio.comune)
      .subscribe({
        next: (data: Patrimonio[]) => {
          console.log('Filtered patrimonio: ', data);
          this.patrimonioList = data;
        },
        error: (error: any) => {
          console.error('Error fetching filtered data:', error);
        },
      });

    // Update the query parameters to reflect the filter state in the URL
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        comune: this.patrimonio.comune,
      },
      queryParamsHandling: 'merge',
    });
  }

  cancellaCerca() {}
}
