import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contabilita } from 'src/app/core/models/contabilita.model';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';

@Component({
  selector: 'app-piani-conti-list',
  templateUrl: './piani-conti-list.component.html',
  styleUrls: ['./piani-conti-list.component.css']
})
export class PianiContiListComponent {
  pageTitle: string = 'Piano dei Conti';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
  ];

  pianoDeiContiList: Contabilita[]= [];
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor(private bootstrap: BootstrapService) { }
  ngOnInit() {
      this.getList();
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['data']
       // console.log('Response from resolver:', response);
        this.pianoDeiContiList = response;
      }
      });
  }

}
