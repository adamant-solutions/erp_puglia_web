import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Interventi } from 'src/app/core/models/manutenzione.model';

@Component({
  selector: 'app-dettagli-interventi',
  templateUrl: './dettagli-interventi.component.html',
  styleUrls: ['./dettagli-interventi.component.css']
})
export class DettagliInterventiComponent {
  pageTitle: string = 'Visualizza Interventi';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Interventi', link: '/manutenzione/interventi' },
  ];
  interventoForm!: FormGroup;
  intervento!: Interventi;
  imprese: any[]=[];
  richieste: any[]=[]
 
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  constructor(private fb: FormBuilder,private datePipe: DatePipe) {}

  ngOnInit(): void {
 
    this.route.data.subscribe(({ data , imprese , richieste}) => {
      this.intervento = data;
      this.imprese = imprese;
      this.richieste = richieste;
      this.initForm();
    })


  }

  initForm() {
    this.interventoForm = this.fb.group({
      id: [this.intervento.id],
      richiestaId: [this.getRichiestaName(this.intervento.richiestaId)], 
      dataInizio: [this.formatDate(this.intervento.dataInizio)],
      dataFine: [this.formatDate(this.intervento.dataFine)],
      dataIntervento: [this.formatDate(this.intervento.dataIntervento) || ''],
      descrizione: [this.intervento.descrizione],
      materialiUtilizzati: [this.intervento.materialiUtilizzati],
      oreLavoro: [this.intervento.oreLavoro],
      costoMateriali: [this.intervento.costoMateriali],
      costoManodopera: [this.intervento.costoManodopera],
      noteTecniche: [this.intervento.noteTecniche],
      esitoIntervento: [this.intervento.esitoIntervento],
      impresaId: [this.getImprese(this.intervento.impresaId)],
      personaleCoinvolto: [this.intervento.personaleCoinvolto],
      garanziaFino: [this.intervento.garanziaFino || ''],
      stato: [this.intervento.stato]
    });

    this.interventoForm.disable();
  }

    formatDate(dateString: string | null): string | null {
      return dateString ? this.datePipe.transform(dateString, 'dd/MM/yyyy') : null;
    }

    getRichiestaName(id: number): string {
      const richiestaFound = this.richieste.find((item: { id: number }) => item.id === id);
      return richiestaFound?.indirizzoUnita ?? '';
    }

    getImprese(id: number): string {
      const impreseFound = this.imprese.find((item: { id: number }) => item.id === id);
      return impreseFound?.ragioneSociale ?? '';
    }

  indietro() {
    this.router.navigate(['/manutenzione/interventi']);
  }

}
