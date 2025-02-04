import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Appaltio, StatoAppalto } from 'src/app/core/models/manutenzione.model';
import { AppaltiSearchParams } from 'src/app/core/services/manutenzione-services/appalti.service';

@Component({
  selector: 'app-view-appalti',
  templateUrl: './view-appalti.component.html',
  styleUrls: ['./view-appalti.component.css'],
})
export class ViewAppaltiComponent {
  pageTitle: string = 'Richieste manutenzione';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];

  appaltiList: Appaltio[] = [];
  currentPage = 0;
  pageSize = 10; 
  totalItems!: number;

  appaltiSearchParams: AppaltiSearchParams = {
    pagina: 0,
    codiceCIG: '',
    codiceCUP: '',
    stato: '',  //select StatoAppalto
  }


  statoList: StatoAppalto[] = [
    StatoAppalto.IN_PROGRAMMAZIONE,
    StatoAppalto.IN_PROGETTAZIONE,
    StatoAppalto.BANDO_IN_CORSO,
    StatoAppalto.VALUTAZIONE_OFFERTE,
    StatoAppalto.AGGIUDICATO,
    StatoAppalto.IN_ESECUZIONE,
    StatoAppalto.SOSPESO,
    StatoAppalto.COLLAUDATO,
    StatoAppalto.CHIUSO,
    StatoAppalto.ANNULLATO
  ];

  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor() { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
      this.appaltiSearchParams.codiceCIG = params['codiceCIG'] || '';
      this.appaltiSearchParams.codiceCUP = params['codiceCUP'] || '';
      this.appaltiSearchParams.stato = params['stato'] || '';
    
      this.getList();
    });
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['appaltiResolver']
        console.log('Response from resolver:', response);
        this.appaltiList = response.body;
        this.totalItems = response.headers.get('X-Total-Count');
         //console.log('Total items: ', this.totalItems);
      }
      });
  }

  getFilteredData(pageNumber: number){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: pageNumber,
        codiceCIG: this.appaltiSearchParams.codiceCIG,
        codiceCUP: this.appaltiSearchParams.codiceCUP,
        stato: this.appaltiSearchParams.stato
      },
      queryParamsHandling: 'merge',
    });
  }

  cancellaCerca(){
    this.appaltiSearchParams = {
      pagina: 0,
      codiceCIG: '',
      codiceCUP: '',
      stato: '',
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: 0 },
    });
  }

  
  onPageChange(event: PageEvent): void {

    const pageIndex = event.pageIndex;
    this.router.navigate([], {
      queryParams: { pagina: pageIndex },
      queryParamsHandling: 'merge',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}

/* 
[
  {
      "id": 7,
      "codiceCIG": "ZA12B3C4Dk",
      "codiceCUP": "J71H2300000000p",
      "oggetto": "Manutenzione straordinaria degli impianti di riscaldamento degli edifici del lotto 3",
      "tipoAppalto": "LAVORI",  // select 
      "stato": "IN_ESECUZIONE", // select 
      "importoBaseAsta": 150000,
      "importoAggiudicazione": null,
      "dataPubblicazione": "2024-03-20",
      "dataScadenza": "2024-04-20",
      "dataAggiudicazione": null,
      "impresaAggiudicatariaId": null
  },
  {
      "id": 5,
      "codiceCIG": "ZA12B3C4D5",
      "codiceCUP": "J71H23000000001",
      "oggetto": "Manutenzione ordinaria degli impianti - Piano 2024",
      "tipoAppalto": "LAVORI",
      "stato": "AGGIUDICATO",
      "importoBaseAsta": 150000,
      "importoAggiudicazione": null,
      "dataPubblicazione": "2024-01-01",
      "dataScadenza": "2024-02-01",
      "dataAggiudicazione": "2024-02-15",
      "impresaAggiudicatariaId": 1
  }
] */