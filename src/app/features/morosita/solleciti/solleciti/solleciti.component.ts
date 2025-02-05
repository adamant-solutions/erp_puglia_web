import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sollecito } from 'src/app/core/models/sollecito.model';

@Component({
  selector: 'app-solleciti',
  templateUrl: './solleciti.component.html',
  styleUrls: ['./solleciti.component.css']
})
export class SollecitiComponent {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' }
  ];
  sollecitiList: Sollecito[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sollecitiList = data['sollecitiResolver'] || [];
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
