import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Imprese } from 'src/app/core/models/manutenzione.model';
import { ImpreseSearchParams } from 'src/app/core/services/manutenzione-services/imprese.service';

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

  impreseList: Imprese[] = [];

  currentPage = 0;
  pageSize = 10; 
  totalItems!: number;

  impreseSearchParams: ImpreseSearchParams = {
    pagina: 0,
    ragioneSociale: '',
    partitaIva: '',
  }

  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor() { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
      this.impreseSearchParams.ragioneSociale = params['ragioneSociale'] || '';
      this.impreseSearchParams.partitaIva = params['partitaIva'] || '';
    
      this.getList();
    });
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['impreseResolver']
        console.log('Response from resolver:', response);
        this.impreseList = response.body;
        this.totalItems = response.headers.get('X-Total-Count');
         //console.log('Total items: ', this.totalItems);
      }
      });
  }

  getFilteredData(pageNumber: number){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: pageNumber,
        ragioneSociale: this.impreseSearchParams.ragioneSociale,
        partitaIva: this.impreseSearchParams.partitaIva,
      },
      queryParamsHandling: 'merge',
    });
  }

  cancellaCerca(){
    this.impreseSearchParams = {
      pagina: 0,
      ragioneSociale: '',
      partitaIva: '',
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: 0 },
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
}
