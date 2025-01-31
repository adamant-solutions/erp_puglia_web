import {Component, inject} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { StatoContratto, ModelLight, Contratti } from 'src/app/core/models/contratto.model';
import { ContrattiService } from 'src/app/core/services/contratti.service';

@Component({
  selector: 'app-contratti-locazione',
  templateUrl: './contratti-locazione.component.html',
  styleUrls: ['./contratti-locazione.component.css'],
})
export class ContrattiLocazioneComponent {
  pageTitle: string = 'Contratti locazione';
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  contrattiList: Contratti[] = [];
  contrattoId!: number;

  currentPage = 0;
  pageSize = 10; 
  totalPages = 0;
  numElements!: number;
  searchIndirizzoParam = '';
  searchCanoneMensileMinParam = '';
  searchCanoneMensileMaxParam = '';
  searchDataInizioFromParam = '';
  searchDataInizioToParam = '';
  searchDataFineToParam = '';

    
  statoContratti: StatoContratto[] = ['ATTIVO', 'SCADUTO', 'DISDETTO', 'ANNULLATO'];
  patrimonioList: ModelLight[] = [];
  intestatariList: ModelLight[] = [];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(
    private contrattiSvc: ContrattiService,
  
   ) { }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
        this.searchIndirizzoParam = params['indirizzo'] || '';
        this.searchCanoneMensileMinParam = params['canoneMensileMin'] || '';
        this.searchCanoneMensileMaxParam = params['canoneMensileMax'] || '';
        this.searchDataInizioFromParam = params['dataInizioFrom'] || '';
        this.searchDataInizioToParam = params['dataInizioTo'] || '';
        this.searchDataFineToParam = params['dataFineTo'] || '';
        this.getList();
      console.log(this.contrattiList)
    });

  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
       
        const responseData = data['contrattiResolver']
        this.contrattiList = responseData.body
        this.numElements = responseData.headers.get('X-Paging-TotalRecordCount');
        this.totalPages = responseData.headers.get('X-Paging-PageCount');
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

    onPageChange(event: PageEvent): void {
      // const pageIndex = event.pageIndex + 1; 
      const pageIndex = event.pageIndex;
  
      this.router.navigate([], {
        queryParams: { pagina: pageIndex },
        queryParamsHandling: 'merge',
      });
  
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    

  getFilteredData(pageNumber: number) {
    const currentParams = { ...this.route.snapshot.queryParams };
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        ...currentParams,
        pagina: pageNumber,
        indirizzo: this.searchIndirizzoParam,
        canoneMensileMin: this.searchCanoneMensileMinParam,
        canoneMensileMax: this.searchCanoneMensileMaxParam,
        dataInizioFrom: this.searchDataInizioFromParam,
        dataInizioTo: this.searchDataInizioToParam,
        dataFineTo: this.searchDataFineToParam,
      },
      queryParamsHandling: 'merge',
    });
  }


  cancellaCerca() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        pagina: 0,
        indirizzo: '',
        canoneMensileMin: '',
        canoneMensileMax: '',
        dataInizioFrom: '',
        dataInizioTo: '',
        dataFineTo: '',
      },
    });
  }





}
