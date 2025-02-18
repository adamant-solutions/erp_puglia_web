import {Component, inject} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { StatoContratto, ModelLight, Contratti } from 'src/app/core/models/contratto.model';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';

import { ContrattiService } from 'src/app/core/services/contratti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
  selectedContrattoId!: number;
  selectedDocumentoId!: any;
  documentsToDownload: any[] = [];

    
  statoContratti: StatoContratto[] = ['ATTIVO', 'SCADUTO', 'DISDETTO', 'ANNULLATO'];
  patrimonioList: ModelLight[] = [];
  intestatariList: ModelLight[] = [];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(
    private contrattiSvc: ContrattiService,
    private bootstrapService: BootstrapService,
    private notificationService: NotificationService
  
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
        //console.log(this.contrattiList)
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



  showDownloadModal(contrattoId: number, documents: any[]) {
    this.selectedContrattoId = contrattoId;
    this.documentsToDownload = documents;
    this.selectedDocumentoId = documents.length > 0 ? documents[0].id : null;
    this.bootstrapService.showModal('downloadModal');
  }

  downloadDocument() {
    if (!this.selectedDocumentoId) {
      console.error('No document selected');
      return;
    }

    const selectedDocument = this.documentsToDownload.find(
      (doc) => doc.id === this.selectedDocumentoId
    );
    if (!selectedDocument) {
      console.error('Selected document not found');
      return;
    }

    this.contrattiSvc
      .downloadDocument(this.selectedContrattoId, this.selectedDocumentoId)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedDocument.nomeFile}`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.bootstrapService.hideModal('downloadModal');
          this.notificationService.addNotification({
            message: 'Il file è stato scaricato con successo!',
            type: 'success',
            timeout: 3000,
          });
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: "Download del file non riuscito!",
            type: 'error',
            timeout: 3000,
          });
        }
      });
  }


}
