import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Condominio } from 'src/app/core/models/condominio.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-condomini-list',
  templateUrl: './condomini-list.component.html',
  styleUrls: ['./condomini-list.component.css']
})
export class CondominiListComponent {
  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageTitle = 'Condomini';
  condominiList: Condominio[] = [];
  totalPages = 0;
  pageSize = 10;
  currentPage = 0;
  condominioId: number | null = null;

  searchCodiceParam = '';
  searchDenominazioneParam = '';
  searchComuneParam = '';
  searchProvinciaParam = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.condominiList = data['condomini'];
      this.totalPages = this.condominiList.length;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  cancellaCerca(): void {
    this.searchCodiceParam = '';
    this.searchDenominazioneParam = '';
    this.searchComuneParam = '';
    this.searchProvinciaParam = '';
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}