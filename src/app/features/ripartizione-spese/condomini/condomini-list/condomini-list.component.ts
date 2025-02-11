import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Condominio } from 'src/app/core/models/condominio.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-condomini-list',
  templateUrl: './condomini-list.component.html',
  styleUrls: ['./condomini-list.component.css']
})
export class CondominiListComponent {
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageTitle = 'Condomini';
  condominiList: Condominio[] = [];
  totalPages = 0;
  pageSize = 10;
  currentPage = 0;
  condominioId: number | null = null;

  searchCodiceParam = '';
  searchDenominazioneParam = '';
  searchComuneParam = '';
  searchProvinciaParam = '';

  constructor(private route: ActivatedRoute,  private router: Router) {}

  ngOnInit() {
 
    this.route.queryParams.subscribe(params => {
      this.searchCodiceParam = params['codice'] || '';
      this.searchDenominazioneParam = params['denominazione'] || '';
      this.searchComuneParam = params['comune'] || '';
      this.searchProvinciaParam = params['provincia'] || '';
      this.currentPage = parseInt(params['page'] || '0');
      this.pageSize = parseInt(params['size'] || '10');
    });

 
    this.route.data.subscribe({
      next: (data) => {
        if (data['condomini']) {
    
          const responseData = data['condomini'];
          
   
          if (responseData.body) {
      
            this.condominiList = responseData.body;
            
      
            if (responseData.headers && responseData.headers.get('x-paging-totalrecordcount')) {
         
              this.totalPages = parseInt(responseData.headers.get('x-paging-totalrecordcount') || '0');
            } 
          }
        }
      },
      error: (err) => {
   
        this.condominiList = [];
        this.totalPages = 0;
      }
    });
  }

  cercaCondomini(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }

    const queryParams: any = {
      page: this.currentPage,
      size: this.pageSize
    };

    if (this.searchCodiceParam) queryParams.codice = this.searchCodiceParam;
    if (this.searchDenominazioneParam) queryParams.denominazione = this.searchDenominazioneParam;
    if (this.searchComuneParam) queryParams.comune = this.searchComuneParam;
    if (this.searchProvinciaParam) queryParams.provincia = this.searchProvinciaParam;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }



  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        page: this.currentPage,
        size: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }

  cancellaCerca(): void {
    this.searchCodiceParam = '';
    this.searchDenominazioneParam = '';
    this.searchComuneParam = '';
    this.searchProvinciaParam = '';
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 0,
        size: this.pageSize
      }
    });
  }

}