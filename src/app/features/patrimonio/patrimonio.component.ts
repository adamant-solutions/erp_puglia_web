import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Documento,
  Patrimonio,
  StatoDisponibilita,
} from 'src/app/core/models/patrimonio.model';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { PageEvent } from '@angular/material/paginator';
import { PatrimonioSearchParams } from 'src/app/core/resolvers/patrimonio.resolver';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.css'],
})
export class PatrimonioComponent implements OnInit {
  pageTitle: string = 'Unità Immobiliare';
  selectedPatrimonioId!: number;
  selectedDocumentoId!: any;
  documentsToDownload: Documento[] = [];
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  patrimonioList: Patrimonio[] = [];

  patrimonioId!: number;
  patrimonioIndirizzo!: string;
  patrimonioCivico!: string;
  patrimonioComune!: string;

  patrimonioSearchParams: PatrimonioSearchParams = {
    comune: '',
    indirizzo: '',
    statoDisponibilita: '',
  };

  totalItems = 0; // Total number of items, retrieved from backend
  pageSize = 10; // Default number of items per page
  currentPage = 0; // Current page number / index

  statoDisponibilitaList: StatoDisponibilita[] = [
    StatoDisponibilita.DISPONIBILE,
    StatoDisponibilita.OCCUPATO,
    StatoDisponibilita.IN_MANUTENZIONE,
    StatoDisponibilita.SFITTO,
    StatoDisponibilita.NON_DISPONIBILE,
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private patrimonioService: PatrimonioService,
    private bootstrapService: BootstrapService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentPage = +params['pagina'] || 0;
      this.patrimonioSearchParams.comune = params['comune'] || '';
      this.patrimonioSearchParams.indirizzo = params['indirizzo'] || '';
      this.patrimonioSearchParams.statoDisponibilita =
        params['statoDisponibilita'] || '';

      this.getPatrimonioList();
    });
  }

  getPatrimonioList() {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        const response = data['patrimonioResolver'];
        //  console.log('Response from resolver:', response);
        this.patrimonioList = response.body;
        this.totalItems = response.headers.get('X-Paging-TotalRecordCount');
        //  console.log('Total items: ', this.totalItems);
      },
    });
  }

  getDocumentTypes(documenti: any[]): string {
    return documenti.map((doc) => doc.tipoDocumento).join(', ');
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

  // Delete patrimonio
  deletePatrimonioModal(patrimonio: Patrimonio | any) {
    this.patrimonioId = patrimonio.id;

    this.patrimonioIndirizzo = patrimonio.indirizzo;
    this.patrimonioCivico = patrimonio.civico;
    this.patrimonioComune = patrimonio.comune;

    this.bootstrapService.showModal('deletePatrimonioModal');
  }

  deletePatrimonio() {
    this.patrimonioService.deletePatrimonio(this.patrimonioId).subscribe({
      next: () => {
        this.bootstrapService.showModal('deletePatrimonioModal2'); 
        // Update the list by filtering out the deleted item
        this.patrimonioList = this.patrimonioList.filter(
          (patrimonio) => patrimonio.id !== this.patrimonioId
        );
      },
      error: (error: any) => {
       /*  console.error(error); */
        this.notificationService.addNotification({
          message: error.error.message,
          type: 'error',
          timeout: 7000,
        });
      },
    });
  }

  // Filter / Search
  getFilteredData(pageNumber: number) {
  
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        pagina: pageNumber,
        comune: this.patrimonioSearchParams.comune,
        indirizzo: this.patrimonioSearchParams.indirizzo,
        statoDisponibilita: this.patrimonioSearchParams.statoDisponibilita,
      },
      queryParamsHandling: 'merge',
    });
  }

  // Reset / cancel search
  cancellaCerca() {
    this.patrimonioSearchParams = {
      comune: '',
      indirizzo: '',
      statoDisponibilita: '',
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { pagina: 0 },
    });
  }

  showDownloadModal(patrimonioId: number, documents: Documento[]) {
    this.selectedPatrimonioId = patrimonioId;
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

    this.patrimonioService
      .downloadDocument(this.selectedPatrimonioId, this.selectedDocumentoId)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedDocument.tipoDocumento}_${selectedDocument.dataDocumento}.pdf`;
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
