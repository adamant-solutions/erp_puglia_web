import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { StatoRichiesta, TipoManutenzione, OrigineRichiesta, PrioritaIntervento } from 'src/app/core/models/manutenzione.model';
import { RichiesteService } from 'src/app/core/services/manutenzione-services/richieste.service';

@Component({
  selector: 'app-add-richieste',
  templateUrl: './add-richieste.component.html',
  styleUrls: ['./add-richieste.component.css']
})
export class AddRichiesteComponent {

  pageTitle: string = 'Nuova Richiesta';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Richieste', link: '/manutenzione/richieste' },
  ];
  addForm!: FormGroup;
  unita: ModelLight[] = [];
  richiedente: ModelLight[] = [];
  piani: ModelLight[] = [];
  appalti: any[] = [];

  
  statoList: StatoRichiesta[] = [
    StatoRichiesta.APPROVATA,
    StatoRichiesta.CHIUSA,
    StatoRichiesta.COMPLETATA,
    StatoRichiesta.IN_COLLAUDO,
    StatoRichiesta.IN_ESECUZIONE,
    StatoRichiesta.IN_VERIFICA,
    StatoRichiesta.PIANIFICATA,
    StatoRichiesta.RICEVUTA,
    StatoRichiesta.RIFIUTATA,
  ];

  tipoMList: TipoManutenzione[] = [
    TipoManutenzione.ORDINARIA,
    TipoManutenzione.STRAORDINARIA
  ];

  origineList: OrigineRichiesta[] = [
    OrigineRichiesta.PIANO_MANUTENZIONE,
    OrigineRichiesta.SEGNALAZIONE,
    OrigineRichiesta.EMERGENZA,
    OrigineRichiesta.ISPEZIONE
  ]
 
  prioritaList: PrioritaIntervento[] = [
    PrioritaIntervento.EMERGENZA,
    PrioritaIntervento.ALTA,
    PrioritaIntervento.MEDIA,
    PrioritaIntervento.BASSA
  ]

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor(private fb: FormBuilder,private richiesteService: RichiesteService) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ unitaData, richiedenteData, pianiData ,appaltiData }) => {
      this.unita = unitaData.body;
      this.richiedente = richiedenteData.body;
      this.appalti = appaltiData;
      this.piani = pianiData;
      this.initForm();
    })
  }

  initForm() {
    this.addForm = this.fb.group({
      id: [-1],
      unitaImmobiliareId: ['',[Validators.required]],
      richiedenteId: ['',[Validators.required]],
      dataRichiesta: ['',[Validators.required]],
      descrizione: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(1000)]],
      tipoManutenzione: ['',[Validators.required]],
      stato: ['',[Validators.required]],
      priorita: ['',[Validators.required]],
      noteVerifica: [''],
      dataApprovazione: [''],
      dataPianificazione: [''],
      dataInizioLavori: [''],
      dataFineLavori: [''],
      esitoCollaudo: [''],
      pianoId: [''],
      appaltoId: [''],
      origineRichiesta: ['',[Validators.required]],
      budgetStimato: ['',[Validators.pattern('^\\d*(\\.\\d+)?$')]],
      budgetEffettivo: ['',[Validators.pattern('^\\d*(\\.\\d+)?$')]],
      periodoPianificato: ['',[Validators.required,Validators.pattern(/^(Q[1-4]|[A-Z]{3})\s\d{4}$/)]]
    });

  }

  onSubmit() {
    console.log('Form Submitted', this.addForm.value);
    if (this.addForm.valid) {
      console.log('Form Submitted', this.addForm.value);
      this.richiesteService.addRichiesta(this.addForm.getRawValue()).subscribe({
        next: (res) => {
          alert('Dati salvati con successo!');
          this.router.navigate(['manutenzione/richieste/richiesta-dettagli/' + res.id]);
        },
        error: (err) =>{
          alert('Error!');
        }
      })
  
    }
  }

  resetForm() {
    this.addForm.reset();
  }

  indietro() {
    this.router.navigate(['/manutenzione/richieste']);
  }
}
