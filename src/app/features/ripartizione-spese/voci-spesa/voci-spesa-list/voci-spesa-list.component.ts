import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { PeriodoLight } from 'src/app/core/models/periodi-gestione.model';
import { VoceSpesaDTO } from 'src/app/core/models/voce-spesa.model';
import { VoceSpesaService } from 'src/app/core/services/ripartizione-spese/voce-spesa.service';

interface BootstrapModal {
  show(): void;
  hide(): void;
  dispose(): void;
}

@Component({
  selector: 'app-voci-spesa-list',
  templateUrl: './voci-spesa-list.component.html',
  styleUrls: ['./voci-spesa-list.component.css']
})
export class VociSpesaListComponent implements OnInit, OnDestroy {
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageTitle = 'Voci di Spesa';
  vociSpesaList: VoceSpesaDTO[] = [];
  totalPages = 0;
  pageSize = 10;
  currentPage = 0;
  periodi: PeriodoLight[] = [];

  voceSpesaToDelete: VoceSpesaDTO | null = null;
  deleteModal: BootstrapModal | null = null;
  successModal: BootstrapModal | null = null;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private voceSpesaService: VoceSpesaService
  ) {
    this.searchForm = this.fb.group({
      descrizione: [''],
      periodoId: ['']
    });
  }

  ngOnInit() {
    const deleteModalEl = document.getElementById('deleteVoceSpesaModal');
    if (deleteModalEl) {
      this.deleteModal = new bootstrap.Modal(deleteModalEl);
    }

  
    this.route.data.subscribe(data => {
      if (data['periodi']) {
        this.periodi = data['periodi'];
      }
    });

   
    this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue({
        descrizione: params['descrizione'] || '',
        periodoId: params['periodoId'] || ''
      });
      
      this.currentPage = parseInt(params['pagina'] || '0');
    
    });

   
    this.route.data.subscribe({
      next: (data) => {
        if (data['vociSpesa']) {
          const responseData = data['vociSpesa'];
          if (responseData.body) {
            this.vociSpesaList = responseData.body;
            const totalCount = responseData.headers.get('x-paging-totalrecordcount');
            this.totalPages = totalCount ? parseInt(totalCount) : 0;
          }
        }
      },
      error: (err) => {
        this.vociSpesaList = [];
        this.totalPages = 0;
      }
    });
  }

  ngOnDestroy() {
    if (this.deleteModal) {
      this.deleteModal.dispose();
    }
    if (this.successModal) {
      this.successModal.dispose();
    }
  }

  cercaVociSpesa(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }

    const queryParams: any = {
      pagina: this.currentPage,

    };

    const descrizione = this.searchForm.get('descrizione')?.value;
    const periodoId = this.searchForm.get('periodoId')?.value;

    if (descrizione) {
      queryParams.descrizione = descrizione;
    }
    if (periodoId) {
      queryParams.periodoId = periodoId;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    }).then(() => {
    
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        pagina: this.currentPage,
     
      },
      queryParamsHandling: 'merge'
    });
  }

  cancellaCerca(): void {
    this.searchForm.reset();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: 0,
      
      }
    });
  }

  openDeleteModal(voceSpesa: VoceSpesaDTO): void {
    this.voceSpesaToDelete = voceSpesa;
    if (this.deleteModal) {
      this.deleteModal.show();
    }
  }

  confirmDelete(): void {
    if (this.voceSpesaToDelete && this.voceSpesaToDelete.id) {
      this.voceSpesaService.deleteVoceSpesa(this.voceSpesaToDelete.id).subscribe({
        next: () => {
          if (this.deleteModal) {
            this.deleteModal.hide();
          }
          if (this.successModal) {
            this.successModal.show();
          }
        
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: this.route.snapshot.queryParams
          });
        },
        error: () => {
          if (this.deleteModal) {
            this.deleteModal.hide();
          }
        }
      });
    }
  }

  closeSuccessModal(): void {
    if (this.successModal) {
      this.successModal.hide();
    }
    this.voceSpesaToDelete = null;
  }
}