import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Condominio } from 'src/app/core/models/condominio.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CondominioService } from 'src/app/core/services/ripartizione-spese/condominio.service';
declare var bootstrap: any;

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

  condominioToDelete: Condominio | null = null;
  deleteModal: any;
  successModal: any;
  constructor(private route: ActivatedRoute,  private router: Router,private condominioService: CondominioService) {}

  ngOnInit() {
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteCondominioModal'));
    this.successModal = new bootstrap.Modal(document.getElementById('deleteCondominioModal2'));
 
    this.route.queryParams.subscribe(params => {
      this.searchCodiceParam = params['codice'] || '';
      this.searchDenominazioneParam = params['denominazione'] || '';
      this.searchComuneParam = params['comune'] || '';
      this.searchProvinciaParam = params['provincia'] || '';
      this.currentPage = parseInt(params['pagina'] || '0');
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
      pagina: this.currentPage,
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
        pagina: this.currentPage,
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
        pagina: 0,
        size: this.pageSize
      }
    });
  }

  openDeleteModal(condominio: Condominio): void {
    this.condominioToDelete = condominio;
    this.deleteModal.show();
  }

  confirmDelete(): void {
    if (this.condominioToDelete) {
      this.condominioService.deleteCondominio(this.condominioToDelete.id).subscribe({
        next: () => {
         
          this.deleteModal.hide();
          
       
          this.successModal.show();
  
        
          this.refreshList();
        },
        error: (error) => {
          console.error('Error deleting condominio:', error);
          this.deleteModal.hide();
         
        }
      });
    }
  }
  
  refreshList(): void {
 
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
      }
    });
  }
  
  closeSuccessModal(): void {
    this.successModal.hide();
    this.condominioToDelete = null;

    this.refreshList();
  }

}