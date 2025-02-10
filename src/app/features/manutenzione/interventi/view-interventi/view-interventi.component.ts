import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Interventi, StatoIntervento } from 'src/app/core/models/manutenzione.model';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { InterventiSearchParams, InterventiService } from 'src/app/core/services/manutenzione-services/interventi.service';

@Component({
  selector: 'app-view-interventi',
  templateUrl: './view-interventi.component.html',
  styleUrls: ['./view-interventi.component.css']
})
export class ViewInterventiComponent {
  pageTitle: string = 'Interventi';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];

  interventList: Interventi[] = [];
  interventId!: number;
  interventNome!: string;
  richiesta: any[]=[];

  currentPage = 0;
  pageSize = 10; 
  totalItems!: number;

  interventiSearchParams: InterventiSearchParams = {
    pagina: 0,
    descrizione: '',
    stato: ''
  }

  statoList: StatoIntervento[] = [
    StatoIntervento.PROGRAMMATO,
    StatoIntervento.IN_CORSO,
    StatoIntervento.COMPLETATO,
    StatoIntervento.ANNULLATO
  ];

  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor(private intSrc: InterventiService,private bootstrap: BootstrapService) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
      this.interventiSearchParams.descrizione = params['descrizione'] || '';
      this.interventiSearchParams.stato = params['stato'] || '';
    
      this.getList();
    });
  }

  getList(){
    this.route.data.subscribe(({ data, dataRichieste}) =>{
        this.interventList = data.body;
        this.totalItems = data.headers.get('X-Total-Count');
        this.richiesta = dataRichieste
         //console.log('Total items: ', this.totalItems);
      });
  }

  getFilteredData(pageNumber: number){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: pageNumber,
        descrizione: this.interventiSearchParams.descrizione,
        stato: this.interventiSearchParams.stato
      },
      queryParamsHandling: 'merge',
    });
  }

  cancellaCerca(){
    this.interventiSearchParams = {
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


  deleteModal(item: Interventi | any) {
    this.interventId = item.id;
    this.interventNome = item.descrizione;
    this.bootstrap.showModal('deleteInterventiModal');
  }

  deleteInterventi() {
    this.intSrc.deleteInterventi(this.interventId).subscribe({
      next: () => {
        this.interventList = this.interventList.filter(
          (item) => item.id !== this.interventId
        );
        // this.notificationService.success(`"${this.impreseId}" deleted successfully.`);
      },
      error: (error: any) => {
        console.error(error);
        // this.notificationService.error(`Failed to delete "${this.impreseId}". Please try again.`);
      },
    });
  }

  getRichiestaName(id: number): string {
    const richiestaFound = this.richiesta.find((item: { id: number }) => item.id === id);
    return richiestaFound?.indirizzoUnita ?? '';
  }
}
