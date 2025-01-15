import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.css'],
})
export class PatrimonioComponent implements OnInit {
  pageTitle: string = 'Patrimonio';

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  patrimonioList: Patrimonio[] = [];

  patrimonioId!: number;

  patrimonio: Patrimonio | any = {
    comune: '',
    indirizzo: '',
    statoDisponibilita: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private patrimonioService: PatrimonioService,
    private bootstrapService: BootstrapService
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

  // Delete patrimonio
  deletePatrimonioModal(patrimonio: Patrimonio | any) {
    this.patrimonioId = patrimonio.id;
    this.bootstrapService.showModal('deletePatrimonioModal');
  }

  deletePatrimonio() {
    this.patrimonioService.deletePatrimonio(this.patrimonioId).subscribe({
      next: () => {
        // Update the list by filtering out the deleted item
        this.patrimonioList = this.patrimonioList.filter(
          (patrimonio) => patrimonio.id !== this.patrimonioId
        );
        // this.notificationService.success(`Patrimonio "${this.patrimonioId}" deleted successfully.`);
      },
      error: (error) => {
        console.error(error);
        // this.notificationService.error(`Failed to delete patrimonio "${this.patrimonioId}". Please try again.`);
      },
    });
  }

  // Filter / Search
  getFilteredData() {
    console.log(
      'Data sent for filtering: ',
      `${this.patrimonio.comune}${this.patrimonio.indirizzo}${this.patrimonio.statoDisponibilita}`
    );

    this.patrimonioService
      .getFilteredPatrimonio(
        this.patrimonio.comune,
        this.patrimonio.indirizzo,
        this.patrimonio.statoDisponibilita
      )
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
        indirizzo: this.patrimonio.indirizzo,
        statoDisponibilita: this.patrimonio.statoDisponibilita,
      },
      queryParamsHandling: 'merge',
    });
  }

  // Reset / cancel search
  cancellaCerca() {
    /*
    this.patrimonio.comune = '';
    this.patrimonio.indirizzo = '';
    this.patrimonio.statoDisponibilita = '';
    */

    this.patrimonio = {
      comune: '',
      indirizzo: '',
      statoDisponibilita: '',
    };

    // this.getFilteredData(0);

    this.getPatrimonioList();

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      // queryParams: { pagina: 0 },
    });
  }
}
