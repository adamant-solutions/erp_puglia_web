import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { Periodi, StatoPagamenti } from 'src/app/core/services/ripartizione-spese/stato-pagamenti.service';

@Component({
  selector: 'app-stato-pagamenti-list',
  templateUrl: './stato-pagamenti-list.component.html',
  styleUrls: ['./stato-pagamenti-list.component.css']
})
export class StatoPagamentiListComponent {
  pageTitle: string = 'Stato Pagamenti';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' }
  ];

  pagamentiList: StatoPagamenti[] = [];
  pagamentiConPeriodi: StatoPagamenti[] = [];
  selectedPeriodi!: Periodi[];

  private route = inject(ActivatedRoute);

  constructor(private bootstrapService: BootstrapService) { }

  ngOnInit() {
      this.getList();
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['pagamenti']
        console.log('Response from resolver:', response);
        this.pagamentiList = response.body;
       
          // Filter out unita with empty periodi
        this.pagamentiConPeriodi = this.pagamentiList.filter(unita => unita.periodi && unita.periodi.length > 0);
            
          console.log('Filtered pagamentiConPeriodi:', this.pagamentiConPeriodi);

      }
      });
  }

  openModal(periodi: Periodi[]) {
    this.selectedPeriodi = [...periodi];
    this.bootstrapService.showModal('periodiModal');
  }

}
