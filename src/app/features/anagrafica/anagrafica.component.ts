import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css'],
})
export class AnagraficaComponent implements OnInit {
  pageTitle: string = 'Anagrafica';

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  anagraficaList: Anagrafica[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAnagrafica();
  }

  getAnagrafica() {
    this.activatedRoute.data
      .pipe(map((data) => data['anagraficaResolver']))
      .subscribe((response) => {
        this.anagraficaList = response;
      });
  }
}
