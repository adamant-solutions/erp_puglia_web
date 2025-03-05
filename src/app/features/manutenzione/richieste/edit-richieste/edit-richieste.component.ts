
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { OrigineRichiesta, PrioritaIntervento, Richiesta, StatoRichiesta, TipoManutenzione } from 'src/app/core/models/manutenzione.model';
import { RichiesteService } from 'src/app/core/services/manutenzione-services/richieste.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-richieste',
  templateUrl: './edit-richieste.component.html',
  styleUrls: ['./edit-richieste.component.css']
})
export class EditRichiesteComponent {

  pageTitle: string = 'Modifica Richiesta';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Richieste', link: '/manutenzione/richieste' },
  ];
  editForm!: FormGroup;
  richiesta!: Richiesta;
  unita: ModelLight[] = [];
  richiedente: ModelLight[] = [];
  piani: ModelLight[] = [];
  appalti: any[] = [];
  submitted: boolean = false;
  
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
  constructor(private fb: FormBuilder,private richiesteService: RichiesteService,private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ data, unitaData, richiedenteData, pianiData ,appaltiData }) => {
      this.richiesta = data;
      this.unita = unitaData.body;
      this.richiedente = richiedenteData.body;
      this.appalti = appaltiData;
      this.piani = pianiData;
      this.initForm();
    })
  }

  initForm() {
    this.editForm = this.fb.group({
      id: [this.richiesta.id],
      unitaImmobiliareId: [this.richiesta.unitaImmobiliareId,[Validators.required]],
      richiedenteId: [this.richiesta.richiedenteId,[Validators.required]],
      dataRichiesta: [this.richiesta.dataRichiesta,[Validators.required]],
      descrizione: [this.richiesta.descrizione,[Validators.required,Validators.minLength(10),Validators.maxLength(1000)]],
      tipoManutenzione: [this.richiesta.tipoManutenzione,[Validators.required]],
      stato: [this.richiesta.stato,[Validators.required]],
      priorita: [this.richiesta.priorita,[Validators.required]],
      noteVerifica: [this.richiesta.noteVerifica],
      dataApprovazione: [this.richiesta.dataApprovazione],
      dataPianificazione: [this.richiesta.dataPianificazione],
      dataInizioLavori: [this.richiesta.dataInizioLavori],
      dataFineLavori: [this.richiesta.dataFineLavori],
      esitoCollaudo: [this.richiesta.esitoCollaudo],
      pianoId: [this.richiesta.pianoId],
      appaltoId: [this.richiesta.appaltoId],
      origineRichiesta: [this.richiesta.origineRichiesta,[Validators.required]],
      budgetStimato: [this.richiesta.budgetStimato,[Validators.pattern('^\\d*(\\.\\d+)?$')]],
      budgetEffettivo: [this.richiesta.budgetEffettivo,[Validators.pattern('^\\d*(\\.\\d+)?$')]],
      periodoPianificato: [this.richiesta.periodoPianificato,[Validators.pattern(/^(Q[1-4]|[A-Z]{3})\s\d{4}$/)]]
    });

  }

  onSubmit() {
    this.submitted = true;
    console.log('Form Submitted', this.editForm.value);
    if (this.editForm.valid) {
     // console.log('Form Submitted', this.editForm.value);
      this.richiesteService.editRichiesta(this.editForm.getRawValue()).subscribe({
        next: (res) => {
          this.notificationService.addNotification({
            message: 'Richiesta salvata con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['manutenzione/richieste/richiesta-dettagli/' + this.richiesta.id]);
        },
        error: (err) =>{
          this.notificationService.addNotification({
            message: err.error.message,
            type: 'error',
            timeout: 5000,
          });
        }
      })
  
    }
  }

  resetForm() {
    this.editForm.reset(this.richiesta);
  }

  indietro() {
    this.router.navigate(['/manutenzione/richieste']);
  }
}
