import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PeriodiGestione } from 'src/app/core/models/periodi-gestione.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoGestioneService } from 'src/app/core/services/ripartizione-spese/periodi-gestione.service';
declare var bootstrap: any;

@Component({
  selector: 'app-periodi-list',
  templateUrl: './periodi-gestione-list.component.html',
  styleUrls: ['./periodi-gestione-list.component.css']
})
export class PeriodiListComponent {
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageTitle = 'Periodi di Gestione';
  periodiList: PeriodiGestione[] = [];
  totalPages = 0;
  pageSize = 10;
  currentPage = 0;

  searchDataInizioParam = '';
  searchDataFineParam = '';
  searchStatoParam = '';

  periodoToDelete: PeriodiGestione | null = null;
  deleteModal: any;
  successModal: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private periodoService: PeriodoGestioneService
  ) {}

  ngOnInit() {
    this.deleteModal = new bootstrap.Modal(document.getElementById('deletePeriodoModal'));
    this.successModal = new bootstrap.Modal(document.getElementById('deletePeriodoModal2'));

  
    this.route.queryParams.subscribe(params => {
      this.searchDataInizioParam = params['dataInizio'] || '';
      this.searchDataFineParam = params['dataFine'] || '';
      this.searchStatoParam = params['stato'] || '';
      this.currentPage = parseInt(params['page'] || '0');
      this.pageSize = parseInt(params['size'] || '10');
    });

  
    this.route.data.subscribe({
      next: (data) => {
        if (data['periodoResolver']) { 
          const responseData = data['periodoResolver'];
          if (responseData.body) {
            this.periodiList = responseData.body;
            if (responseData.headers && responseData.headers.get('x-paging-totalrecordcount')) {
              this.totalPages = parseInt(responseData.headers.get('x-paging-totalrecordcount') || '0');
            }
          }
        }
      },
      error: (err) => {
        this.periodiList = [];
        this.totalPages = 0;
      }
    });
  }

  cercaPeriodi(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }

    const queryParams: any = {
      page: this.currentPage,
      size: this.pageSize
    };

    if (this.searchDataInizioParam) queryParams.dataInizio = this.searchDataInizioParam;
    if (this.searchDataFineParam) queryParams.dataFine = this.searchDataFineParam;
    if (this.searchStatoParam) queryParams.stato = this.searchStatoParam;

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
    this.searchDataInizioParam = '';
    this.searchDataFineParam = '';
    this.searchStatoParam = '';
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 0,
        size: this.pageSize
      }
    });
  }

  openDeleteModal(periodo: PeriodiGestione): void {
    this.periodoToDelete = periodo;
    this.deleteModal.show();
  }

  confirmDelete(): void {
    if (this.periodoToDelete) {
      this.periodoService.deletePeriodo(this.periodoToDelete.id).subscribe({
        next: () => {
          this.deleteModal.hide();
          this.successModal.show();
          this.refreshList();
        },
        error: (error: any) => {
      
          this.deleteModal.hide();
        }
      });
    }
  }

  refreshList(): void {
   
    const queryParams = {
      page: this.currentPage,
      size: this.pageSize,
      dataInizio: this.searchDataInizioParam,
      dataFine: this.searchDataFineParam,
      stato: this.searchStatoParam
    };

    this.periodoService.getPeriodi(
      queryParams.page,
      queryParams.size,
      queryParams.dataInizio,
      queryParams.dataFine,
      queryParams.stato
    ).subscribe({
      next: (responseData) => {
        if (responseData.body) {
          this.periodiList = responseData.body;
          if (responseData.headers && responseData.headers.get('x-paging-totalrecordcount')) {
            this.totalPages = parseInt(responseData.headers.get('x-paging-totalrecordcount') || '0');
          }
        }
      },
      error: (err) => {
        this.periodiList = [];
        this.totalPages = 0;
      }
    });
  }

  closeSuccessModal(): void {
    this.successModal.hide();
    this.periodoToDelete = null;
    this.refreshList();
  }
}