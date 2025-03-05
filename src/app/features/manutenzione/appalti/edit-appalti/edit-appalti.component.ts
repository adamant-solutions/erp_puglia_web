import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appalto, Imprese, StatoAppalto, TipoAppalto } from 'src/app/core/models/manutenzione.model';
import { AppaltiService } from 'src/app/core/services/manutenzione-services/appalti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-appalti',
  templateUrl: './edit-appalti.component.html',
  styleUrls: ['./edit-appalti.component.css']
})
export class EditAppaltiComponent {
  pageTitle: string = 'Modifica Appalto';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Appalti', link: '/manutenzione/appalti' },
  ];
  appalto: Appalto = {
    id: 0,
    codiceCIG: '',
    codiceCUP: '',
    oggetto: '',
    tipoAppalto: '',
    stato: '',
    importoBaseAsta: 0,
    importoAggiudicazione: undefined,
    dataPubblicazione: '',
    dataScadenza: '',
    dataAggiudicazione: '',
    impresaAggiudicatariaId: 0,
    pianoId: 0,
    importo: 0,
    note: ''
  }

  editForm!: FormGroup;
  submitted: boolean = false;
  impreseList: Imprese[] = [];
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


  constructor(private appSrc: AppaltiService,private fb: FormBuilder,private notificationService: NotificationService) { }
  ngOnInit() {
    this.route.data.subscribe(({ data , dataImprese}) => {
      this.appalto = data
      this.impreseList = [...dataImprese]
      this.initForm();
    })
  }

  initForm() {
    this.editForm = this.fb.group({
      id: this.appalto.id,
      codiceCIG: [this.appalto.codiceCIG,[Validators.required,Validators.minLength(10)]],
      codiceCUP: [this.appalto.codiceCUP,[Validators.required,Validators.minLength(15)]],
      oggetto: [this.appalto.oggetto,[Validators.required,Validators.minLength(10),Validators.maxLength(500)]],
      tipoAppalto: [this.appalto.tipoAppalto,[Validators.required]],
      stato: [this.appalto.stato,[Validators.required]],
      importoBaseAsta: [this.appalto.importoBaseAsta],
      importoAggiudicazione: [this.appalto.importoAggiudicazione],
      dataPubblicazione: [this.appalto.dataPubblicazione,[Validators.required]],
      dataScadenza: [this.appalto.dataScadenza,[Validators.required]],
      dataAggiudicazione: [this.appalto.dataAggiudicazione],
      impresaAggiudicatariaId: [this.appalto.impresaAggiudicatariaId]
    }); 

  }  

  onSubmit() {
    this.submitted  = true
   // console.log('Form Submitted', this.editForm.value);
    if (this.editForm.valid) {
      const sendData = {
        ...this.editForm.getRawValue(),
        impresaAggiudicatariaId: +this.editForm.controls['impresaAggiudicatariaId'].value
      }
      console.log('Form Submitted', this.editForm.value);
      this.appSrc.editAppalto(sendData).subscribe({
        next: (res) => {
          this.notificationService.addNotification({
            message: 'Appalto salvato con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['manutenzione/appalti/appalto-dettagli/' + this.appalto.id]);
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
    this.editForm.reset(this.appalto);
  }
  
  
  indietro() {
    this.router.navigate(['/manutenzione/appalti']);
  }

}
