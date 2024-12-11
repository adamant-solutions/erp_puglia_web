import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  currentPage = 1; // Current page number / index
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private anagraficaService: AnagraficaService,
    private bootstrapService: BootstrapService
  ) {}

  ngOnInit(): void {
    this.getAnagraficaList();

    // Watch for query parameter changes (e.g., page number)
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentPage = params['pagina'] ? Number(params['pagina']) : 1;
    });
  }

  getAnagraficaList() {
    this.activatedRoute.data
      .pipe(map((data) => data['anagraficaResolver']))
      .subscribe((response) => {
        console.log('Response from resolver:', response);
        this.anagraficaList = response;

        // this.totalItems = response.totalItems;
        this.totalItems = this.anagraficaList.length; // pageSize ?
      });
  }

  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1; // MatPaginator's pageIndex starts from 0, convert 0-based index to 1-based
    this.router.navigate([], {
      queryParams: { pagina: pageIndex },
      queryParamsHandling: 'merge',
    });
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

  getFilteredData() {}

  cancellaCerca() {}
}
