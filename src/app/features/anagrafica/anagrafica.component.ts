import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css'],
})
export class AnagraficaComponent implements OnInit {
  pageTitle: string = 'Anagrafica';

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  anagraficaList: Anagrafica[] = [];

  anagraficaId!: number;

  anagrafica: Anagrafica | any = {
    cittadino: {
      nome: '',
      cognome: '',
      codiceFiscale: '',
    },
  };

  totalItems = 0; // Total number of items, retrieved from backend
  pageSize = 10; // Default number of items per page
  currentPage = 0; // Current page number / index

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private anagraficaService: AnagraficaService,
    private bootstrapService: BootstrapService
  ) {}

  ngOnInit(): void {
    this.getAnagraficaList();
  }

  getAnagraficaList() {
    // Load initial data from resolver
    this.activatedRoute.data
      .pipe(map((data) => data['anagraficaResolver']))
      .subscribe((response) => {
        console.log('Response from resolver:', response);
        this.anagraficaList = response;

        this.anagraficaService.getTotalItems().subscribe((data) => {
          this.totalItems = data.nrAnagrafica;
          console.log('Total items: ', this.totalItems);
        });
      });
  }

  onPageChange(event: PageEvent): void {
    // const pageIndex = event.pageIndex + 1; // MatPaginator's pageIndex starts from 0, convert 0-based index to 1-based
    const pageIndex = event.pageIndex;

    this.router.navigate([], {
      queryParams: { pagina: pageIndex },
      queryParamsHandling: 'merge',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteAnagraficaModal(anagrafica: Anagrafica | any) {
    this.anagraficaId = anagrafica.id;
    this.bootstrapService.showModal('deleteAnagraficaModal');
  }

  deleteAnagrafica() {
    this.anagraficaService.deleteAnagrafica(this.anagraficaId).subscribe({
      next: () => {
        // Update the list by filtering out the deleted item
        this.anagraficaList = this.anagraficaList.filter(
          (anagrafica) => anagrafica.id !== this.anagraficaId
        );
        // this.notificationService.success(`Anagrafica "${this.anagraficaId}" deleted successfully.`);
      },
      error: (error) => {
        console.error(error);
        // this.notificationService.error(`Failed to delete anagrafica "${this.anagraficaId}". Please try again.`);
      },
    });
  }

  getFilteredData(pageNumber: number) {
    if (
      !(
        this.anagrafica.cittadino.nome?.trim() ||
        this.anagrafica.cittadino.cognome?.trim() ||
        this.anagrafica.cittadino.codiceFiscale?.trim()
      )
    ) {
      console.warn('At least one filter criterion must be provided.');
      return;
    }

    console.log(
      'Data sent for filtering: ',
      `${this.anagrafica.cittadino.nome}${this.anagrafica.cittadino.cognome}${this.anagrafica.cittadino.codiceFiscale}`
    );

    this.anagraficaService
      .getFilteredAnagrafica(
        pageNumber,
        this.anagrafica.cittadino.nome,
        this.anagrafica.cittadino.cognome,
        this.anagrafica.cittadino.codiceFiscale
      )
      .subscribe({
        next: (data: HttpResponse<Anagrafica[]> | any) => {
          console.log('Filtered anagrafica: ', data);
          // this.anagraficaList = data.body ?? [];
          this.anagraficaList = data;

          this.totalItems = +(
            data.headers.get('X-Paging-TotalRecordCount') ?? 0
          );
          console.log('Filtered totalItems', this.totalItems);

          // Update the query parameters to reflect the filter state in the URL
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
              pagina: pageNumber,
              nome: this.anagrafica.cittadino.nome,
              cognome: this.anagrafica.cittadino.cognome,
              codiceFiscale: this.anagrafica.cittadino.codiceFiscale,
            },
            queryParamsHandling: 'merge',
          });
        },
        error: (error: any) => {
          console.error('Error fetching filtered data:', error);
        },
      });
  }

  cancellaCerca() {
    /*
    this.anagrafica.cittadino.nome = '';
    this.anagrafica.cittadino.cognome = '';
    this.anagrafica.cittadino.codiceFiscale = '';
    */

    this.anagrafica = {
      cittadino: {
        nome: '',
        cognome: '',
        codiceFiscale: '',
      },
    };

    // this.getFilteredData(0);

    this.getAnagraficaList();

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { pagina: 0 },
    });
  }
}
