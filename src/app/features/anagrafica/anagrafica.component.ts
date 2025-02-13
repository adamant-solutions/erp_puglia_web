import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import {
  Anagrafica,
  TipoDocumento,
} from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';
import { AnagraficaSearchParams } from 'src/app/core/resolvers/anagrafica.resolver';

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
    private bootstrapService: BootstrapService
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
        // Update the list by filtering out the deleted item
        this.anagraficaList = this.anagraficaList.filter(
          (anagrafica) => anagrafica.id !== this.anagraficaId
        );
        // this.notificationService.success(`Anagrafica per "${this.anagraficaMainIdentificationData}" eliminata con successo.`);
      },
      error: (error) => {
        console.error(error);
        // this.notificationService.error(`Impossibile eliminare anagrafica per "${this.anagraficaMainIdentificationData}". Riprova.`);
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
          console.log('Download response received', blob);

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
        },
        error: (error) => {
          console.error('Download failed:', error);
        },
      });
  }

  showDownloadModal(anagraficaId: number) {
    this.selectedAnagraficaId = anagraficaId;

    this.anagraficaService.getAnagraficaById(anagraficaId).subscribe({
      next: (anagrafica) => {
        this.currentAnagrafica = anagrafica;
        this.selectedDocumentType = null;
        this.bootstrapService.showModal('downloadModal');
      },
      error: (error) => {
        console.error('Error fetching anagrafica details:', error);
      },
    });
  }
}
