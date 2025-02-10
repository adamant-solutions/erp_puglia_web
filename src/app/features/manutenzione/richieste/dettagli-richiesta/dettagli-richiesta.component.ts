import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { Richiesta } from 'src/app/core/models/manutenzione.model';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';

@Component({
  selector: 'app-dettagli-richiesta',
  templateUrl: './dettagli-richiesta.component.html',
  styleUrls: ['./dettagli-richiesta.component.css']
})
export class DettagliRichiestaComponent {

  pageTitle: string = 'Visualizza Richiesta';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Richieste', link: '/manutenzione/richieste' },
  ];
  viewForm!: FormGroup;
  richiesta!: Richiesta;
  unita: ModelLight[] = [];
  richiedente: ModelLight[] = [];
  piani: ModelLight[] = [];
  appalti: any[] = [];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor(private fb: FormBuilder,private datePipe: DatePipe,private capitalize: CapitalizePipe) {}
  ngOnInit(): void {
    this.route.data.subscribe(({ data , unitaData , richiedenteData , pianiData , appaltiData}) => {
      this.richiesta = data;
      this.unita = unitaData.body;
      this.richiedente = richiedenteData.body;
      this.appalti = appaltiData;
      this.piani = pianiData;
      this.initForm();
    })
  }

  initForm() {
    this.viewForm = this.fb.group({
    id: [this.richiesta.id],
    unitaImmobiliareId: [this.getUnita(this.richiesta.unitaImmobiliareId)],//select
    richiedenteId: [this.getRichiedente(this.richiesta.richiedenteId)],//select
    dataRichiesta: [this.formatDate(this.richiesta.dataRichiesta)],
    descrizione: [this.richiesta.descrizione],
    tipoManutenzione: [this.transformText(this.richiesta.tipoManutenzione)],//select
    stato: [this.transformText(this.richiesta.stato)],//select
    priorita: [this.transformText(this.richiesta.priorita)], //select PrioritaIntervento
    noteVerifica: [this.richiesta.noteVerifica],
    dataApprovazione: [this.formatDate(this.richiesta.dataApprovazione)],
    dataPianificazione: [this.formatDate(this.richiesta.dataPianificazione)],
    dataInizioLavori: [this.formatDate(this.richiesta.dataInizioLavori)],
    dataFineLavori: [this.formatDate(this.richiesta.dataFineLavori)],
    esitoCollaudo: [this.richiesta.esitoCollaudo],
    pianoId: [this.getPiani(this.richiesta.pianoId)],//select
    appaltoId: [this.getAppalti(this.richiesta.appaltoId)],//select
    origineRichiesta: [this.transformText(this.richiesta.origineRichiesta)], //select
    budgetStimato: [this.richiesta.budgetStimato],
    budgetEffettivo: [this.richiesta.budgetEffettivo],
    periodoPianificato: [this.richiesta.periodoPianificato]
  });

  this.viewForm.disable();
}

formatDate(date: string | null): string | null {
  return date ? this.datePipe.transform(date, 'dd/MM/yyyy') : null;
}

transformText(text: string): string {
  return this.capitalize.transform(text);
}


getUnita(id: number): string {
  const unitaFound = this.unita.find((item: { id: number }) => item.id === id);
  return unitaFound?.descrizione ?? '';
}

getRichiedente(id: number): string {
  const richiedenteFound = this.richiedente.find((item: { id: number }) => item.id === id);
  return richiedenteFound?.descrizione ?? '';
}

getAppalti(id: number): string {
  const appaltiFound = this.appalti.find((item: { id: number }) => item.id === id);
  return appaltiFound?.codiceCIG ?? '';
}

getPiani(id: number): string {
  const pianiFound = this.piani.find((item: { id: number }) => item.id === id);
  return pianiFound?.descrizione ?? '';
}

  indietro() {
    this.router.navigate(['/manutenzione/richieste']);
  }
}
