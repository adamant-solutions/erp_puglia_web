import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Appalto, StatoAppalto } from 'src/app/core/models/manutenzione.model';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { AppaltiSearchParams, AppaltiService } from 'src/app/core/services/manutenzione-services/appalti.service';

@Component({
  selector: 'app-view-appalti',
  templateUrl: './view-appalti.component.html',
  styleUrls: ['./view-appalti.component.css'],
})
export class ViewAppaltiComponent {
  pageTitle: string = 'Appalti';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];

  appaltiList: Appalto[] = [];
  appaltoId!: number;
  appaltoCIG: string = '';
  appaltoCUP: string = '';
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


  constructor(private appSrc: AppaltiService,private bootstrap: BootstrapService) { }
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

  
  deleteModal(item: Appalto) {
    this.appaltoId = item.id;
    this.appaltoCIG = item.codiceCIG;
    this.appaltoCUP = item.codiceCUP;
    this.bootstrap.showModal('deleteAppaltoModal');
  }

  deleteAppalto() {
    this.appSrc.deleteAppalto(this.appaltoId).subscribe({
      next: () => {
        this.appaltiList = this.appaltiList.filter(
          (item) => item.id !== this.appaltoId
        );
        // this.notificationService.success(`"${this.appaltoId}" deleted successfully.`);
      },
      error: (error: any) => {
        console.error(error);
        // this.notificationService.error(`Failed to delete "${this.appaltoId}". Please try again.`);
      },
    });
  }

}
