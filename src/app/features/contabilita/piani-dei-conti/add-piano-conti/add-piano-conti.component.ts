import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoConto } from 'src/app/core/models/contabilita/piano-dei-conti.model';
import { PianoDeiContiService } from 'src/app/core/services/contabilita-services/piano-dei-conti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-piano-conti',
  templateUrl: './add-piano-conti.component.html',
  styleUrls: ['./add-piano-conti.component.css']
})
export class AddPianoContiComponent {
  pageTitle: string = 'Aggiungi Piano dei Conti';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
    { label: 'Piano dei Conti', link: '/contabilita/piano-dei-conti' },
  ];
  
  pianoForm!: FormGroup;
  errorMsg: string = '';
  submitted = false;
  parents: any[]=[]

  tipoContoList : TipoConto[] = [
    TipoConto.ATTIVITA ,
    TipoConto.PASSIVITA, 
    TipoConto.COSTI,
    TipoConto.RICAVI,
    TipoConto.PATRIMONIO 
  ]
  
  
  constructor(private pianoDeiContiService: PianoDeiContiService,
    private router: Router,
    private route: ActivatedRoute,
    private notifService: NotificationService
  ){}

  ngOnInit(){
    this.route.data.subscribe(({ allPiani }) => {
      this.parents = allPiani
    })
      this.initForm();
 }

 initForm(){
  this.pianoForm = new FormGroup({
 
    codice: new FormControl(null,[Validators.required]),
    descrizione: new FormControl(null,[Validators.required]),
    tipo: new FormControl(null,[Validators.required]),
    parentId: new FormControl(null),
  });
 }

 save(): void {
  this.submitted = true;
  if (this.pianoForm.invalid) {
    return;
  }
  
  const accountData = this.pianoForm.getRawValue()

  this.pianoDeiContiService.create(accountData).subscribe({
      next: (res) => {
        this.notifService.addNotification({
          message: 'Piano dei conti salvato con successo!',
          type: 'success',
          timeout: 3000,
        });
        this.router.navigate(['/contabilita/piano-dei-conti']);
      },
      error: (error) => {
        this.notifService.addNotification({
          message: this.handleError(error.error),
          type: 'error',
          timeout: 5000,
        });
      },
    });

  }

  private handleError(error: any): string {
    switch (error.status) {
      case 400:
        return (this.errorMsg =
          'Dati non validi. Controlla i campi obbligatori.');
      case 422:
        return (this.errorMsg = 'Dati non validi o piano dei conti già esiste.');
      case 500:
        return (this.errorMsg = error.message);
      default:
        return (this.errorMsg = 'Errore durante il salvataggio del contratto.');
    }
  }

  resetForm(form: any) {
    form.reset();
  }
  
  
  indietro() {
    this.router.navigate(['/contabilita/piano-dei-conti']);
  }

  transformTipo(tipo: string): string {
    return tipo === 'ATTIVITA' ? 'ATTIVITÀ' : tipo === 'PASSIVITA' ? 'PASSIVITÀ' : tipo;
  }
}