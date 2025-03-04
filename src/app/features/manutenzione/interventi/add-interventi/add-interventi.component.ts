import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Interventi, PrioritaIntervento, StatoIntervento } from 'src/app/core/models/manutenzione.model';
import { InterventiService } from 'src/app/core/services/manutenzione-services/interventi.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-interventi',
  templateUrl: './add-interventi.component.html',
  styleUrls: ['./add-interventi.component.css']
})
export class AddInterventiComponent {
  pageTitle: string = 'Modifica Interventi';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Interventi', link: '/manutenzione/interventi' },
  ];
  interventoForm!: FormGroup;
  intervento!: Interventi;
  appalti: any[] = [];
  richieste: any[] = [];
  submitted: boolean = false;

  
  statoList: StatoIntervento[] = [
    StatoIntervento.PROGRAMMATO,
    StatoIntervento.IN_CORSO,
    StatoIntervento.COMPLETATO,
    StatoIntervento.ANNULLATO
  ];

  prioritaList: PrioritaIntervento[] = [
    PrioritaIntervento.EMERGENZA,
    PrioritaIntervento.ALTA,
    PrioritaIntervento.MEDIA,
    PrioritaIntervento.BASSA
  ]

  private router = inject(Router);
  private route = inject(ActivatedRoute);


  constructor(private fb: FormBuilder,private intService: InterventiService,private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.route.data.subscribe(({ appalti, richieste }) => {
      this.appalti = appalti;
      this.richieste = richieste;
      this.initForm();
    })


  }

  initForm() {
    this.interventoForm = this.fb.group({
      id: -1,
      richiestaId: [null,[Validators.required]], //id64
      appaltoId: [null], //plani i lidhur me appalton
      descrizione: [null,[Validators.required,Validators.minLength(10)]],
      dataInizio: [null,[Validators.required]],
      dataFine: [null],
      dataIntervento: [null,[Validators.required]],
      importo: [null,Validators.pattern('^\\d*(\\.\\d+)?$')],
      stato: [null,[Validators.required]],
      priorita: [null],
      note: [null],
     
     /*  materialiUtilizzati: [null],
      oreLavoro: [null],
      costoManodopera: [null,Validators.pattern('^\\d*(\\.\\d+)?$')],
      esitoIntervento: [null],
      impresaId: [null],
      personaleCoinvolto: [null],
      garanziaFino: [null], */
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.interventoForm.valid) {
      console.log('Form Submitted', this.interventoForm.value);
      this.intService.addInterventi(this.interventoForm.value).subscribe({
        next: (res) => {
          this.notificationService.addNotification({
            message: 'Intervento salvato con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['manutenzione/interventi/interventi-dettagli/' + res.id]);
        },
        error: (err) =>{
          this.notificationService.addNotification({
            message: "Si è verificato un errore!",
            type: 'error',
            timeout: 5000,
          });
        }
      })

    }
  }

  resetForm() {
    this.interventoForm.reset();
  }
  indietro() {
    this.router.navigate(['/manutenzione/interventi']);
  }
}
