
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Interventi, StatoIntervento } from 'src/app/core/models/manutenzione.model';
import { InterventiService } from 'src/app/core/services/manutenzione-services/interventi.service';

@Component({
  selector: 'app-edit-interventi',
  templateUrl: './edit-interventi.component.html',
  styleUrls: ['./edit-interventi.component.css']
})
export class EditInterventiComponent {
  pageTitle: string = 'Modifica Interventi';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Interventi', link: '/manutenzione/interventi' },
  ];
  interventoForm!: FormGroup;
  intervento!: Interventi;
  imprese: any[] = [];
  richieste: any[] = []

  
  statoList: StatoIntervento[] = [
    StatoIntervento.PROGRAMMATO,
    StatoIntervento.IN_CORSO,
    StatoIntervento.COMPLETATO,
    StatoIntervento.ANNULLATO
  ];

  private router = inject(Router);
  private route = inject(ActivatedRoute);


  constructor(private fb: FormBuilder,private intService: InterventiService) { }

  ngOnInit(): void {

    this.route.data.subscribe(({ data, imprese, richieste }) => {
      this.intervento = data;
      this.imprese = imprese;
      this.richieste = richieste;
      this.initForm();
    })


  }

  initForm() {
    this.interventoForm = this.fb.group({
      id: [this.intervento.id],
      richiestaId: [this.intervento.richiestaId],
      dataInizio: [this.intervento.dataInizio],
      dataFine: [this.intervento.dataFine],
      dataIntervento: [this.intervento.dataIntervento],
      descrizione: [this.intervento.descrizione,[Validators.required,Validators.minLength(10)]],
      materialiUtilizzati: [this.intervento.materialiUtilizzati],
      oreLavoro: [this.intervento.oreLavoro],
      costoMateriali: [this.intervento.costoMateriali,Validators.pattern('^\\d*(\\.\\d+)?$')],
      costoManodopera: [this.intervento.costoManodopera,Validators.pattern('^\\d*(\\.\\d+)?$')],
      noteTecniche: [this.intervento.noteTecniche],
      esitoIntervento: [this.intervento.esitoIntervento],
      impresaId: [this.intervento.impresaId],
      personaleCoinvolto: [this.intervento.personaleCoinvolto],
      garanziaFino: [this.intervento.garanziaFino],
      stato: [this.intervento.stato]
    });
  }


  onSubmit() {
    if (this.interventoForm.valid) {
      console.log('Form Submitted', this.interventoForm.value);
      this.intService.editInterventi(this.interventoForm.value).subscribe({
        next: (res) => {
          alert('Dati salvati con successo!');
          this.router.navigate(['manutenzione/interventi/interventi-dettagli/' + this.intervento.id]);
        },
        error: (err) =>{
          alert('Error!');
        }
      })

    }
  }

  resetForm() {
    this.interventoForm.reset(this.intervento);
  }
  indietro() {
    this.router.navigate(['/manutenzione/interventi']);
  }

}


/* [
    {
        "id": 1,
        "richiestaId": 14,
        "dataInizio": "2024-03-01T08:00:00",
        "dataFine": "2024-03-15T17:00:00",
        "dataIntervento": "2024-03-15",
        "descrizione": "Sostituzione caldaia e manutenzione impianto riscaldamento",
        "materialiUtilizzati": null,
        "oreLavoro": null,
        "costoMateriali": null,
        "costoManodopera": null,
        "noteTecniche": null,
        "esitoIntervento": null,
        "impresaId": null,
        "personaleCoinvolto": null,
        "garanziaFino": null,
        "stato": "IN_CORSO"
    }
] */
