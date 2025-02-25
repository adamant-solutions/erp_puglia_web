import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PianoDeiConti } from 'src/app/core/models/contabilita/piano-dei-conti.model';

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

  pianoDeiContiList: PianoDeiConti[]= [];
  private route = inject(ActivatedRoute);

  constructor() { }
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
