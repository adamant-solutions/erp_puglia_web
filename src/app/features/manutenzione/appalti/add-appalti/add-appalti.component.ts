import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appalto, Piani, StatoAppalto, TipoAppalto } from 'src/app/core/models/manutenzione.model';
import { AppaltiService } from 'src/app/core/services/manutenzione-services/appalti.service';
import { PianiService } from 'src/app/core/services/manutenzione-services/piani.service';

@Component({
  selector: 'app-add-appalti',
  templateUrl: './add-appalti.component.html',
  styleUrls: ['./add-appalti.component.css']
})
export class AddAppaltiComponent {

pageTitle: string = 'Nuovo Appalto';
breadcrumbList = [
  { label: 'ERP - di Regione Puglia', link: '/' },
  { label: 'Manutenzione', link: '/manutenzione' },
  { label: 'Appalti', link: '/manutenzione/appalti' },
];

appalto: Appalto = {
  id: -1,
  codiceCIG: '',
  codiceCUP: '',
  oggetto: '',
  tipoAppalto: '',
  stato: '',
  importoBaseAsta: 0,
  importoAggiudicazione: '',
  dataPubblicazione: '',
  dataScadenza: '',
  dataAggiudicazione: '',
  impresaAggiudicatariaId: 0,
  pianoId: 0,
  importo: 0,
  note: ''
}

pianiList: Piani[] = [];
statoList: StatoAppalto[] = [
  StatoAppalto.IN_PROGRAMMAZIONE,
  StatoAppalto.IN_PROGETTAZIONE,
  StatoAppalto.BANDO_IN_CORSO,
  StatoAppalto.VALUTAZIONE_OFFERTE,
  StatoAppalto.AGGIUDICATO,
  StatoAppalto.IN_ESECUZIONE,
  StatoAppalto.SOSPESO,
  StatoAppalto.COLLAUDATO,
  StatoAppalto.CHIUSO,
  StatoAppalto.ANNULLATO
];

tipoAppaltoList: TipoAppalto[]=[
  TipoAppalto.FORNITURE,
  TipoAppalto.LAVORI,
  TipoAppalto.SERVIZI
]
private route = inject(ActivatedRoute);
private router = inject(Router);

constructor(private appaltoSrc: AppaltiService,private pSrc: PianiService,private datePipe: DatePipe) {}

ngOnInit(): void {
  this.route.data.subscribe(({ dataPiano }) => {
    this.pianiList = [...dataPiano]
  })
}


selectPiano(event: any){
   // console.log(event.target.value)
     this.getPianoById(event.target.value);
}

getPianoById(id: number){
  this.pSrc.getPianiByid(id).subscribe({
    next: (res) => {
      this.appalto.note = res.note
    }
  })
}


formatDate(date: string): string {
  return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
}

onSubmit(form: NgForm) {
  const sendData = {
    ...form.value,
    dataPubblicazione: this.formatDate(form.controls['dataPubblicazione'].value),
    dataScadenza: this.formatDate(form.controls['dataScadenza'].value),
    pianoId: +form.controls['pianoId'].value,
  }
  if (form.valid) {
    console.log('Form Submitted', sendData);
    this.appaltoSrc.addAppalto(sendData).subscribe({
      next: (res) => {
        alert('Dati salvati con successo!');
        this.router.navigate(['manutenzione/appalti/appalto-dettagli/' + res.id]);
      },
      error: (err) =>{
        alert('Error!');
      }
    })

  }
}

resetForm(form: any) {
  form.reset();
}


indietro() {
  this.router.navigate(['/manutenzione/appalti']);
}
}
