import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Appalto } from 'src/app/core/models/manutenzione.model';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';


@Component({
  selector: 'app-dettagli-appalti',
  templateUrl: './dettagli-appalti.component.html',
  styleUrls: ['./dettagli-appalti.component.css']
})
export class DettagliAppaltiComponent {
  pageTitle: string = 'Visualizza Appalto';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manuntenzione', link: '/manutenzione' },
    { label: 'Appalti', link: '/manutenzione/appalti' },
  ];
  viewForm!: FormGroup;
  appalto: Appalto = {
    id: 0,
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
    impresaAggiudicatariaId: 0
  }
  imprese: any;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor(private fb: FormBuilder,private datePipe: DatePipe,private capitalize: CapitalizePipe) {}
  ngOnInit(): void {
    this.route.data.subscribe(({ data }) => {
      this.appalto = data
      this.initForm();
    })
  }

  formatDate(date: string){
   return this.datePipe.transform(date,'dd/MM/yyyy')
  }

  transformText(text: string): string {
    return this.capitalize.transform(text);
  }

  initForm() {

    this.route.data.subscribe(({dataImprese}) => {
       this.imprese = [...dataImprese]
    })

     this.viewForm = this.fb.group({
      codiceCIG: [this.appalto.codiceCIG],
      codiceCUP: [this.appalto.codiceCUP],
      tipoAppalto: [this.transformText(this.appalto.tipoAppalto)],
      stato: [this.transformText(this.appalto.stato)],
      importoBaseAsta: [this.appalto.importoBaseAsta],
      importoAggiudicazione: [this.appalto.importoAggiudicazione],
      dataPubblicazione: [this.formatDate(this.appalto.dataPubblicazione)],
      dataScadenza: [this.formatDate(this.appalto.dataScadenza)],
      dataAggiudicazione: [this.formatDate(this.appalto.dataAggiudicazione) || ''],
      impresaAggiudicatariaId: [this.getImpresaAggiudicataria(this.appalto.impresaAggiudicatariaId)]
    }); 

    this.viewForm.disable();
  }  

  /*   {
        "id": 5,
        "codiceCIG": "ZA12B3C4D5",
        "codiceCUP": "J71H23000000001",
        "oggetto": "Manutenzione ordinaria degli impianti - Piano 2024",
        "tipoAppalto": "LAVORI",
        "stato": "AGGIUDICATO",
        "importoBaseAsta": 150000,
        "importoAggiudicazione": null,
        "dataPubblicazione": "2024-01-01",
        "dataScadenza": "2024-02-01",
        "dataAggiudicazione": "2024-02-15",
        "impresaAggiudicatariaId": 1
    } */

  getImpresaAggiudicataria(impresaAggiudicatariaId: number): string {
    const impresa = this.imprese.find((item: { id: number }) => item.id === impresaAggiudicatariaId);
    return impresa?.ragioneSociale;
   
  }

  indietro() {
    this.router.navigate(['/manutenzione/appalti']);
  }
}
