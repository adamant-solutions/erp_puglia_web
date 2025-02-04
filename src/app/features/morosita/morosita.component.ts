import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Morosita, MorositaSearchParams } from 'src/app/core/models/morosita.model';

@Component({
  selector: 'app-morosita',
  templateUrl: './morosita.component.html',
  styleUrls: ['./morosita.component.css'],
})
export class MorositaComponent {
  pageTitle: string = 'Morosità';
  morositaList: Morosita[] = [];
  searchForm:FormGroup
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      contrattoId: [''],
      stato: [''],
      importoMin: [''],
      importoMax: ['']
    });
  }
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['morositaResolver']) {
        this.morositaList = data['morositaResolver'] || [];
        this.totalItems = data['morositaResolver'].totalElements || 0;
      }
    });

    this.route.queryParams.subscribe(params => {
      this.currentPage = Number(params['pagina']) || 0;
      this.pageSize = Number(params['dimensionePagina']) || 10;
      
      this.searchForm.patchValue({
        contrattoId: params['contrattoId'] || '',
        stato: params['stato'] || '',
        importoMin: params['importoMinimo'] || '',
        importoMax: params['importoMassimo'] || ''
      });
    });
  }
  onSearch(): void {
    const searchParams: MorositaSearchParams = {
      contrattoId: this.searchForm.get('contrattoId')?.value,
      stato: this.searchForm.get('stato')?.value,
      importoMinimo: this.searchForm.get('importoMin')?.value,
      importoMassimo: this.searchForm.get('importoMax')?.value
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...searchParams,
        pagina: 0,
        dimensionePagina: this.pageSize
      },
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
        dimensionePagina: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }
  onReset(): void {
    this.searchForm.reset();
    this.currentPage = 0;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: 0,
        dimensionePagina: this.pageSize
      }
    });
  }
}

