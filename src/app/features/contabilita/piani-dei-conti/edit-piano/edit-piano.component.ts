import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PianoDeiConti, TipoConto } from 'src/app/core/models/contabilita/piano-dei-conti.model';
import { PianoDeiContiService } from 'src/app/core/services/contabilita-services/piano-dei-conti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-piano',
  templateUrl: './edit-piano.component.html',
  styleUrls: ['./edit-piano.component.css']
})
export class EditPianoComponent {
  pageTitle: string = 'Modifica Piano del Conto';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
    { label: 'Piano dei Conti', link: '/contabilita/piano-dei-conti' },
  ];
  
  pianoForm!: FormGroup;
  errorMsg: string = '';
  submitted = false;
  pianoConti!: PianoDeiConti;
  parents: any[] = [];

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
    this.route.data.subscribe(({ piano , allPiani }) => {
      this.pianoConti = piano;
      this.parents = allPiani;
      this.initForm();
    })
    
 }

 initForm(){
  this.pianoForm = new FormGroup({
    id: new FormControl(this.pianoConti?.id),
    codice: new FormControl(this.pianoConti?.codice,[Validators.required]),
    descrizione: new FormControl(this.pianoConti?.descrizione,[Validators.required]),
    tipo: new FormControl(this.pianoConti?.tipo,[Validators.required]),
    parentId: new FormControl(this.pianoConti?.parentId),
    children: new FormControl(this.pianoConti?.children)

  });
 
 }

 
 save(): void {
  this.submitted = true;
  if (this.pianoForm.invalid) {
    return;
  }
  
  const accountData = this.pianoForm.getRawValue()

  this.pianoDeiContiService.update(accountData.id,accountData).subscribe({
      next: (res) => {
        this.notifService.addNotification({
          message: 'Piano dei conti modificato con successo!',
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
        return (this.errorMsg = 'Errore durante il salvataggio del piano.');
    }
  }


 transformTipo(tipo: string): string {
  return tipo === 'ATTIVITA' ? 'ATTIVITÀ' : tipo === 'PASSIVITA' ? 'PASSIVITÀ' : tipo;
}

 indietro(){
  this.router.navigate(['/contabilita/piano-dei-conti']);
 }

 resetForm(form: any) {
  form.reset();
}

}
