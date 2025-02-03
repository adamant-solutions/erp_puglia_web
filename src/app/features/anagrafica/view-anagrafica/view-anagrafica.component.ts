import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-view-anagrafica',
  templateUrl: './view-anagrafica.component.html',
  styleUrls: ['./view-anagrafica.component.css'],
})
export class ViewAnagraficaComponent implements OnInit {
  pageTitle: string = 'Anagrafica dettagli';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  anagrafica!: Anagrafica;
  viewForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anagraficaByIdResolver }) => {
      this.anagrafica = anagraficaByIdResolver;
      console.log('anagraficaByIdResolver: ', anagraficaByIdResolver);
    });

    this.initForm();
  }


  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  initForm() {
  
    const safeAnagrafica = this.getSafeAnagrafica(this.anagrafica);
  
    this.viewForm = this.formBuilder.group({
      cittadino: this.formBuilder.group({
        nome: [safeAnagrafica.cittadino.nome || ''],
        cognome: [safeAnagrafica.cittadino.cognome || ''],
        codiceFiscale: [safeAnagrafica.cittadino.codiceFiscale || ''],
        genere: [safeAnagrafica.cittadino.genere || ''],
        cittadinanza: [safeAnagrafica.cittadino.cittadinanza || ''],
        dataDiNascita: [this.formatDate(safeAnagrafica.cittadino.dataDiNascita)],
        residenza: this.formBuilder.group({
          indirizzo: [safeAnagrafica.cittadino.residenza.indirizzo || ''],
          civico: [safeAnagrafica.cittadino.residenza.civico || ''],
          cap: [safeAnagrafica.cittadino.residenza.cap || ''],
          comuneResidenza: [safeAnagrafica.cittadino.residenza.comuneResidenza || ''],
          provinciaResidenza: [safeAnagrafica.cittadino.residenza.provinciaResidenza || ''],
          statoResidenza: [safeAnagrafica.cittadino.residenza.statoResidenza || ''],
        }),
        contatti: this.formBuilder.group({
          telefono: [safeAnagrafica.cittadino.contatti.telefono || ''],
          cellulare: [safeAnagrafica.cittadino.contatti.cellulare || ''],
          email: [safeAnagrafica.cittadino.contatti.email || ''],
          pec: [safeAnagrafica.cittadino.contatti.pec || ''],
        }),
        luogo_nascita: this.formBuilder.group({
          comune: [safeAnagrafica.cittadino.luogo_nascita.comune || ''],
          provincia: [safeAnagrafica.cittadino.luogo_nascita.provincia || ''],
          stato: [safeAnagrafica.cittadino.luogo_nascita.stato || ''],
        }),
        documenti_identita: this.formBuilder.array(
          safeAnagrafica.cittadino.documenti_identita?.map((doc: any) =>
            this.formBuilder.group({
              tipo_documento: [doc.tipo_documento || ''],
              numero_documento: [doc.numero_documento || ''],
              data_emissione: [this.formatDate(doc.data_emissione)],
              data_scadenza: [this.formatDate(doc.data_scadenza)],
              ente_emittente: [doc.ente_emittente || ''],
              nomeFile: [doc.nomeFile || ''],
              contentType: [doc.contentType || '']
            })
          ) || []
        ),
      }),
    });
  
    this.viewForm.disable();
  }
  
 
  private getSafeAnagrafica(anagrafica: any): any {
    return {
      cittadino: {
        ...anagrafica?.cittadino,
        residenza: {
          ...anagrafica?.cittadino?.residenza,
          indirizzo: anagrafica?.cittadino?.residenza?.indirizzo || '',
          civico: anagrafica?.cittadino?.residenza?.civico || '',
          cap: anagrafica?.cittadino?.residenza?.cap || '',
          comuneResidenza: anagrafica?.cittadino?.residenza?.comuneResidenza || '',
          provinciaResidenza: anagrafica?.cittadino?.residenza?.provinciaResidenza || '',
          statoResidenza: anagrafica?.cittadino?.residenza?.statoResidenza || '',
        },
        contatti: {
          ...anagrafica?.cittadino?.contatti,
          telefono: anagrafica?.cittadino?.contatti?.telefono || '',
          cellulare: anagrafica?.cittadino?.contatti?.cellulare || '',
          email: anagrafica?.cittadino?.contatti?.email || '',
          pec: anagrafica?.cittadino?.contatti?.pec || '',
        },
        luogo_nascita: {
          ...anagrafica?.cittadino?.luogo_nascita,
          comune: anagrafica?.cittadino?.luogo_nascita?.comune || '',
          provincia: anagrafica?.cittadino?.luogo_nascita?.provincia || '',
          stato: anagrafica?.cittadino?.luogo_nascita?.stato || '',
        },
        documenti_identita: anagrafica?.cittadino?.documenti_identita || [],
      },
    };
  }
  get documentiIdentita(): FormArray {
    return this.viewForm.get('cittadino.documenti_identita') as FormArray;
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }
}
