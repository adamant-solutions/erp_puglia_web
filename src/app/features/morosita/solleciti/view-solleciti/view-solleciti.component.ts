import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sollecito } from 'src/app/core/models/sollecito.model';

@Component({
  selector: 'app-view-solleciti',
  templateUrl: './view-solleciti.component.html',
  styleUrls: ['./view-solleciti.component.css']
})
export class ViewSollecitiComponent implements OnInit {
  sollecito: Sollecito = {
    id: 0,
    dataInvio: '',
    dataScadenza: '',
    tipoSollecito: '',
    esitoInvio: '',
    dataRisposta: '',
    esitoRisposta: '',
    costoSollecito: '',
    costoNotifica: '',
    costoLegale: '',
    dettaglioCosti: '',
    note: '',
    numeroProtocollo: ''
  }
  currentMorositaId: number | null = null;
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.sollecito = data['sollecitiResolver'];
      
    });

    this.currentMorositaId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.breadcrumbList = [
      { label: 'ERP - di Regione Puglia', link: '/' },
      { label: 'Morosità', link: '/morosita' },
      { label: 'Dettagli Morosità', link: `/morosita/edit-morosita/${this.currentMorositaId}` },
      {label:'Solleciti', link:`/morosita/edit-morosita/${this.currentMorositaId}/solleciti`}
    ];
  }

  indietro(): void {
    if (this.currentMorositaId) {
      this.router.navigate(['/morosita', 'view-morosita', this.currentMorositaId, 'solleciti']);
    } else {
      this.router.navigate(['/morosita']);
    }
  }
}