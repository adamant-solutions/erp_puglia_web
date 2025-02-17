import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
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
export class VociSpesaListComponent implements OnInit {

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageTitle = 'Voci di Spesa';
  vociSpesaList: VoceSpesaDTO[] = [];
  totalPages = 0;
  pageSize = 10;
  currentPage = 0;

  searchDescrizioneParam = '';
  searchPeriodoIdParam: number | null = null;

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
      tipoSpesa: [''],
      importoMinPreventivo: [''],
      importoMaxPreventivo: [''],
      importoMinConsuntivo: [''],
      importoMaxConsuntivo: [''],
      note: [''],
      periodoId: ['']
    });
  }

  ngOnInit() {
    const deleteModalEl = document.getElementById('deleteVoceSpesaModal');
    if (deleteModalEl) {
      this.deleteModal = new bootstrap.Modal(deleteModalEl);
    }

   
    this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue({
        descrizione: params['descrizione'] || '',
        tipoSpesa: params['tipoSpesa'] || '',
        importoMinPreventivo: params['importoMinPreventivo'] || '',
        importoMaxPreventivo: params['importoMaxPreventivo'] || '',
        importoMinConsuntivo: params['importoMinConsuntivo'] || '',
        importoMaxConsuntivo: params['importoMaxConsuntivo'] || '',
        note: params['note'] || '',
        periodoId: params['periodoId'] || ''
      });
      
      this.currentPage = parseInt(params['pagina'] || '0');
      this.pageSize = parseInt(params['size'] || '10');
    });

    this.loadData();
  }

  ngOnDestroy() {
  
    if (this.deleteModal) {
      this.deleteModal.dispose();
    }
    if (this.successModal) {
      this.successModal.dispose();
    }
  }

  loadData() {
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


  cercaVociSpesa(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  
    const formValues = this.searchForm.value;
    const queryParams: any = {
      pagina: this.currentPage,
      size: this.pageSize
    };
  
   
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        queryParams[key] = value;
      }
    });
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
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
    this.searchForm.reset();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: 0,
        size: this.pageSize
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
          this.loadData();
        },
        error: (error) => {
        
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
    this.loadData();
  }
}