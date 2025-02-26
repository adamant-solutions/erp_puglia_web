import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contratti } from 'src/app/core/models/contratto.model';

@Component({
  selector: 'app-contratti-list',
  templateUrl: './contratti-list.component.html',
  styleUrls: ['./contratti-list.component.css']
})
export class ContrattiListComponent {
  pageTitle: string = 'Contratti locazione'

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
  ];

  contrattiList: Contratti[] = [];
  currentPage = 0;
  pageSize = 10; 
  totalPages = 0;
  numElements!: number;

  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit() {
        this.getList();
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
       
        const responseData = data['data']
        this.contrattiList = responseData
       /*  this.numElements = responseData.headers.get('X-Paging-TotalRecordCount');
        this.totalPages = responseData.headers.get('X-Paging-PageCount'); */
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  transformCodice(value: string){
    return value.replace(/^\d+ - /, '');
  }
}
