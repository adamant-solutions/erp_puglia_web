import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import {
  Anagrafica,
  TipoDocumento,
} from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { PageEvent } from '@angular/material/paginator';
import { AnagraficaSearchParams } from 'src/app/core/resolvers/anagrafica.resolver';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css'],
})
export class AnagraficaComponent implements OnInit {
  pageTitle: string = 'Anagrafica';

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  anagraficaList: Anagrafica[] = [];

  anagraficaId!: number;
  anagraficaMainIdentificationData!: string;

  selectedAnagraficaId: number | null = null;
  selectedDocumentType: TipoDocumento | null = null;
  currentAnagrafica: Anagrafica | null = null;
  anagraficaSearchParams: AnagraficaSearchParams = {
    nome: '',
    cognome: '',
    codiceFiscale: '',
  };

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private anagraficaService: AnagraficaService,
    private bootstrapService: BootstrapService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentPage = +params['pagina'] || 0;
      this.anagraficaSearchParams.nome = params['nome'] || '';
      this.anagraficaSearchParams.cognome = params['cognome'] || '';
      this.anagraficaSearchParams.codiceFiscale = params['codiceFiscale'] || '';

      this.getAnagraficaList();
    });
  }
  getAnagraficaList() {
    // Load initial data from resolver
    this.activatedRoute.data
      .pipe(map((data) => data['anagraficaResolver']))
      .subscribe((response) => {
        console.log('Response from resolver:', response);
        this.anagraficaList = response.body;
        this.totalItems = response.headers.get('X-Paging-TotalRecordCount');
        //this.totalPages = responseData.headers.get('X-Paging-PageCount')

        console.log('Total items: ', this.totalItems);
      });
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

  deleteAnagraficaModal(anagrafica: Anagrafica | any) {
    this.anagraficaId = anagrafica.id;

    this.anagraficaMainIdentificationData = `${anagrafica.cittadino.nome} ${anagrafica.cittadino.cognome} - ${anagrafica.cittadino.codiceFiscale}`;

    this.bootstrapService.showModal('deleteAnagraficaModal');
  }

  deleteAnagrafica() {
    this.anagraficaService.deleteAnagrafica(this.anagraficaId).subscribe({
      next: () => {
         this.bootstrapService.showModal('deleteAnagraficaModalAfter'); 
        this.anagraficaList = this.anagraficaList.filter(
          (anagrafica) => anagrafica.id !== this.anagraficaId
        );

      },
      error: (error) => {
        this.notificationService.addNotification({
          message: error.error.message,
          type: 'error',
          timeout: 7000,
        });
      },
    });
  }

  getFilteredData(pageNumber: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        pagina: pageNumber,
        nome: this.anagraficaSearchParams.nome,
        cognome: this.anagraficaSearchParams.cognome,
        codiceFiscale: this.anagraficaSearchParams.codiceFiscale,
      },
      queryParamsHandling: 'merge',
    });
  }

  cancellaCerca() {
    this.anagraficaSearchParams = {
      nome: '',
      cognome: '',
      codiceFiscale: '',
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { pagina: 0 },
    });
  }

  downloadDocument() {
    if (
      !this.selectedAnagraficaId ||
      !this.selectedDocumentType ||
      !this.currentAnagrafica
    ) {
      console.warn('No anagrafica or document type selected');
      return;
    }

    const selectedDocument =
      this.currentAnagrafica.cittadino.documenti_identita?.find(
        (doc) => doc.tipo_documento === this.selectedDocumentType
      );

    if (!selectedDocument) {
      console.error('Selected document not found');
      return;
    }

    this.anagraficaService
      .downloadDocument(this.selectedAnagraficaId, selectedDocument.id)
      .subscribe({
        next: (blob: Blob) => {
          console.log('Il file è stato scaricato con successo!', blob);

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;

          link.download =
            selectedDocument.nomeFile || `document-${selectedDocument.id}.pdf`;

          document.body.appendChild(link);
          link.click();

          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 100);

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
        },
      });
  }

  showDownloadModal(anagraficaId: number) {
    this.selectedAnagraficaId = anagraficaId;
  
    this.anagraficaService.getAnagraficaById(anagraficaId).subscribe({
      next: (anagrafica) => {
        this.currentAnagrafica = anagrafica;

        if (anagrafica.cittadino.documenti_identita?.length === 1) {
          this.selectedDocumentType = anagrafica.cittadino.documenti_identita[0].tipo_documento;
        } else {
          this.selectedDocumentType = null;
        }
        this.bootstrapService.showModal('downloadModal');
      },
      error: (error) => {
   
      },
    });
  }
}
