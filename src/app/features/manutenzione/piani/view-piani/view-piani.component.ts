import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Piani } from 'src/app/core/models/manutenzione.model';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { PianiSearchParams, PianiService } from 'src/app/core/services/manutenzione-services/piani.service';

@Component({
  selector: 'app-view-piani',
  templateUrl: './view-piani.component.html',
  styleUrls: ['./view-piani.component.css']
})
export class ViewPianiComponent {
  pageTitle: string = 'Piani';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
  ];

  pianiList: Piani[] = [];
  pianoId!: number;
  pianoNome: string = '';
  currentPage = 0;
  pageSize = 10; 
  totalItems!: number;

  pianiSearchParams: PianiSearchParams = {
    pagina: 0,
    descrizione: '',
  }

  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor(private pianiService: PianiService,private bootstrap: BootstrapService) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
      this.pianiSearchParams.descrizione = params['descrizione'] || '';
    
      this.getList();
    });
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['pianiResolver']
       // console.log('Response from resolver:', response);
        this.pianiList = response.body;
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
        descrizione: this.pianiSearchParams.descrizione,
      },
      queryParamsHandling: 'merge',
    });
  }

  cancellaCerca(){
    this.pianiSearchParams = {
      pagina: 0,
      descrizione: '',
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


  
  deleteModal(item: Piani) {
    this.pianoId = item.id;
    this.pianoNome = item.descrizione;
    this.bootstrap.showModal('deletePianoModal');
  }

  deletePiano() {
    this.pianiService.deletePiani(this.pianoId).subscribe({
      next: () => {
        this.pianiList = this.pianiList.filter(
          (item) => item.id !== this.pianoId
        );
        // this.notificationService.success(`"${this.pianoId}" deleted successfully.`);
      },
      error: (error: any) => {
        console.error(error);
        // this.notificationService.error(`Failed to delete "${this.pianoId}". Please try again.`);
      },
    });
  }

}
