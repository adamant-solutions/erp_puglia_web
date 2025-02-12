import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';

@Component({
  selector: 'app-view-patrimonio',
  templateUrl: './view-patrimonio.component.html',
  styleUrls: ['./view-patrimonio.component.css'],
})
export class ViewPatrimonioComponent implements OnInit {
  pageTitle: string = 'Dettagli Unità Immobiliare';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Unità Immobiliare', link: '/patrimonio' },
  ];

  patrimonio!: Patrimonio;
  viewForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private capitalizePipe: CapitalizePipe
  ) {}

  ngOnInit() {
    // Get data from resolver
    this.activatedRoute.data.subscribe(({ patrimonioByIdResolver }) => {
      this.patrimonio = patrimonioByIdResolver;
      console.log('patrimonioByIdResolver: ', patrimonioByIdResolver);
    });

    // Init form
    this.initForm();
  }

  // Format the date to dd/MM/yyyy
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  transformText(text: string): string {
    return this.capitalizePipe.transform(text);
  }

  initForm() {
    this.viewForm = this.formBuilder.group({
      metriQuadri: [this.patrimonio.metriQuadri],
      quartiere: [this.patrimonio.quartiere],
      tipoAmministrazione: [
        this.transformText(this.patrimonio.tipoAmministrazione),
      ],
      statoDisponibilita: [
        this.transformText(this.patrimonio.statoDisponibilita),
      ],
      comune: [this.patrimonio.comune],
      provincia: [this.patrimonio.provincia],
      indirizzo: [this.patrimonio.indirizzo],
      sezioneUrbana: [this.patrimonio.sezioneUrbana],
      foglio: [this.patrimonio.foglio],
      particella: [this.patrimonio.particella],
      categoriaCatastale: [this.patrimonio.categoriaCatastale],
      classeCatastale: [this.patrimonio.classeCatastale],
      renditaCatastale: [this.patrimonio.renditaCatastale],
      consistenzaCatastale: [this.patrimonio.consistenzaCatastale],
      zona: [this.patrimonio.zona],
      classeEnergetica: [this.patrimonio.classeEnergetica],
      descrizione: [this.patrimonio.descrizione],
      civico: [this.patrimonio.civico],
      subalterno: [this.patrimonio.subalterno],
      piano: [this.patrimonio.piano],

      documenti: this.formBuilder.array(
        this.patrimonio.documenti
          ? this.patrimonio.documenti.map((doc: any) =>
              this.formBuilder.group({
                tipoDocumento: [this.transformText(doc.tipoDocumento)],
                dataDocumento: [this.formatDate(doc.dataDocumento)],
                percorsoFile: [doc.percorsoFile],
                descrizione: [doc.descrizione],
              })
            )
          : []
      ),
    });

    this.viewForm.disable();
  }

  get documenti(): FormArray {
    return this.viewForm.get('documenti') as FormArray;
  }

  indietro() {
    this.router.navigate(['/patrimonio']);
  }
}
