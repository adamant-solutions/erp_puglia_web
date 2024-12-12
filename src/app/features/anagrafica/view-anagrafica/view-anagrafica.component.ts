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

  // Format the date to dd/MM/yyyy
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  initForm() {
    this.viewForm = this.formBuilder.group({
      cittadino: this.formBuilder.group({
        nome: [this.anagrafica.cittadino.nome],
        cognome: [this.anagrafica.cittadino.cognome],
        codiceFiscale: [this.anagrafica.cittadino.codiceFiscale],
        genere: [this.anagrafica.cittadino.genere],
        cittadinanza: [this.anagrafica.cittadino.cittadinanza],
        dataDiNascita: [
          this.formatDate(this.anagrafica.cittadino.dataDiNascita),
        ],

        residenza: this.formBuilder.group({
          indirizzo: [this.anagrafica.cittadino.residenza.indirizzo],
          civico: [this.anagrafica.cittadino.residenza.civico],
          cap: [this.anagrafica.cittadino.residenza.cap],
          comuneResidenza: [
            this.anagrafica.cittadino.residenza.comuneResidenza,
          ],
          provinciaResidenza: [
            this.anagrafica.cittadino.residenza.provinciaResidenza,
          ],
          statoResidenza: [this.anagrafica.cittadino.residenza.statoResidenza],
        }),
        contatti: this.formBuilder.group({
          telefono: [this.anagrafica.cittadino.contatti.telefono],
          cellulare: [this.anagrafica.cittadino.contatti.cellulare],
          email: [this.anagrafica.cittadino.contatti.email],
          pec: [this.anagrafica.cittadino.contatti.pec],
        }),
        luogo_nascita: this.formBuilder.group({
          comune: [this.anagrafica.cittadino.luogo_nascita.comune],
          provincia: [this.anagrafica.cittadino.luogo_nascita.provincia],
          stato: [this.anagrafica.cittadino.luogo_nascita.stato],
        }),
        documenti_identita: this.formBuilder.array(
          this.anagrafica.cittadino.documenti_identita
            ? this.anagrafica.cittadino.documenti_identita.map((doc: any) =>
                this.formBuilder.group({
                  tipo_documento: [doc.tipo_documento],
                  numero_documento: [doc.numero_documento],
                  data_emissione: [this.formatDate(doc.data_emissione)],
                  data_scadenza: [this.formatDate(doc.data_scadenza)],
                  ente_emittente: [doc.ente_emittente],
                })
              )
            : []
        ),
      }),
    });

    this.viewForm.disable();
  }

  get documentiIdentita(): FormArray {
    return this.viewForm.get('cittadino.documenti_identita') as FormArray;
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }
}
