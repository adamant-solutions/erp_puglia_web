import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Morosita, MorositaSearchParams } from 'src/app/core/models/morosita.model';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { MorositaService } from 'src/app/core/services/morosita.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-morosita',
  templateUrl: './morosita.component.html',
  styleUrls: ['./morosita.component.css'],
})
export class MorositaComponent implements OnInit {
  statoOptions = [
    { value: 'INTIMATA', label: 'Intimata' },
    { value: 'ACCERTATA', label: 'Accertata' },
    { value: 'IN_RATEIZZAZIONE', label: 'In Rateizzazione' },
    { value: 'IN_RISCOSSIONE', label: 'In Riscossione' },
    { value: 'IN_CONTENZIOSO', label: 'In Contenzioso' },
    { value: 'INESIGIBILE', label: 'Inesigibile' },
    { value: 'ESTINTA', label: 'Estinta' },
    { value: 'SOSPESA', label: 'Sospesa' }
  ];
  pageTitle: string = 'Morosità';
  morositaList: Morosita[] = [];
  searchForm: FormGroup;
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  contrattiLight: ModelLight[] = [];
  morositaToDelete: number | null = null;
  private deleteModal: Modal | null = null;
  private contrattoMap: Map<number, string> = new Map();
  morositanome:string = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private morositaService: MorositaService
  ) {
    this.searchForm = this.fb.group({
      contrattoId: [''],
      stato: [''],
      importoMin: [''],
      importoMax: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.initializeModal();

  
  
  }

  private initializeModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new Modal(modalElement);
    }
  }

  private loadData(): void {
    this.route.data.subscribe((data) => {
      this.contrattiLight = data['contrattiLightResolver'] || [];
      this.createContrattoMap(); 
      if (data['morositaResolver']) {
        this.morositaList = data['morositaResolver'].body || [];
       
        this.totalItems = data['morositaCountResolver'];
 
      }
    });
  
  
    this.route.queryParams.subscribe(params => {
      this.currentPage = Number(params['pagina']) || 0;
      
    
      setTimeout(() => {
        this.searchForm.patchValue({
          contrattoId: params['contrattoId'] || '',
          stato: params['stato'] || '',
          importoMin: params['importoMinimo'] || '',
          importoMax: params['importoMassimo'] || ''
        });
      });
    });
  }

  onSearch(): void {
    const searchParams: MorositaSearchParams = {
      contrattoId: this.searchForm.get('contrattoId')?.value?.toString() || '',
      stato: this.searchForm.get('stato')?.value || '',
      importoMinimo: this.searchForm.get('importoMin')?.value?.toString() || '',
      importoMassimo: this.searchForm.get('importoMax')?.value?.toString() || ''
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...Object.entries(searchParams)
          .filter(([_, value]) => value !== '')
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        pagina: 0,
      },
      queryParamsHandling: 'merge'
    });
  }

  openDeleteModal(morosita: any): void {
    this.morositanome =this.getContrattoDescrizione(morosita.contrattoId)
    this.morositaToDelete = morosita.id;
    this.deleteModal?.show();
  }

  confirmDelete(): void {
    if (this.morositaToDelete) {
      this.morositaService.deleteMorosita(this.morositaToDelete).subscribe({
        next: () => {
          this.deleteModal?.hide();
          this.loadData();
          window.location.reload()
        },
        error: (error) => console.error('Delete failed:', error)
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  onReset(): void {
    this.searchForm.reset();
    this.currentPage = 0;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  private createContrattoMap(): void {
    this.contrattiLight.forEach(contratto => {
      this.contrattoMap.set(contratto.id, contratto.descrizione);
    });
  }
  
  getContrattoDescrizione(contrattoId: number): string {
    return this.contrattoMap.get(contrattoId) || 'N/A';
  }

}