import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Richiesta, StatoRichiesta } from 'src/app/core/models/manutenzione.model';
import { RichiesteSearchParams } from 'src/app/core/services/manutenzione-services/richieste.service';

@Component({
  selector: 'app-view-richieste',
  templateUrl: './view-richieste.component.html',
  styleUrls: ['./view-richieste.component.css']
})
export class ViewRichiesteComponent {
  pageTitle: string = 'Richieste';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];

  richiesteList: Richiesta[] = [];

  currentPage = 0;
  pageSize = 10; 
  totalItems!: number;

  richiesteSearchParams: RichiesteSearchParams = {
    pagina: 0,
    descrizione: '',
    stato: ''
  }

  statoList: StatoRichiesta[] = [
    StatoRichiesta.APPROVATA,
    StatoRichiesta.CHIUSA,
    StatoRichiesta.COMPLETATA,
    StatoRichiesta.IN_COLLAUDO,
    StatoRichiesta.IN_ESECUZIONE,
    StatoRichiesta.IN_VERIFICA,
    StatoRichiesta.PIANIFICATA,
    StatoRichiesta.RICEVUTA,
    StatoRichiesta.RIFIUTATA,
  ];

  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor() { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
      this.richiesteSearchParams.descrizione = params['descrizione'] || '';
      this.richiesteSearchParams.stato = params['stato'] || '';
    
      this.getList();
    });
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['richiesteResolver']
      //  console.log('Response from resolver:', response);
        this.richiesteList = response.body;
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
        descrizione: this.richiesteSearchParams.descrizione,
        stato: this.richiesteSearchParams.stato
      },
      queryParamsHandling: 'merge',
    });
  }

  cancellaCerca(){
    this.richiesteSearchParams = {
      pagina: 0,
      descrizione: '',
      stato: ''
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
