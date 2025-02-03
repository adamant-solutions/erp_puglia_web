import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Morosita } from 'src/app/core/models/morosita.model';

@Component({
  selector: 'app-morosita',
  templateUrl: './morosita.component.html',
  styleUrls: ['./morosita.component.css'],
})
export class MorositaComponent {
  pageTitle: string = 'Morosità';
  morositaList: Morosita[] = [];
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.morositaList = data['morositaResolver'] || [];
      console.log(this.morositaList)
    });
  }
}

