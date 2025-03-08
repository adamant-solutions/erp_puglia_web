import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PianoDeiConti, TipoConto } from 'src/app/core/models/contabilita/piano-dei-conti.model';
import { PianoDeiContiService } from 'src/app/core/services/contabilita-services/piano-dei-conti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-dettagli-piano',
  templateUrl: './dettagli-piano.component.html',
  styleUrls: ['./dettagli-piano.component.css']
})
export class DettagliPianoComponent {
  pageTitle: string = 'Visualizza Piano del Conto';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
    { label: 'Piano dei Conti', link: '/contabilita/piano-dei-conti' },
  ];
  
  pianoForm!: FormGroup;
  errorMsg: string = '';
  submitted = false;
  pianoConti!: PianoDeiConti;

  tipoContoList : TipoConto[] = [
    TipoConto.ATTIVITA ,
    TipoConto.PASSIVITA, 
    TipoConto.COSTI,
    TipoConto.RICAVI,
    TipoConto.PATRIMONIO 
  ]
  
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.route.data.subscribe(({ piani }) => {
      this.pianoConti = piani;
    
      this.initForm();
    })
    
 }

 initForm(){
  this.pianoForm = new FormGroup({
 
    codice: new FormControl(this.pianoConti?.codice,[Validators.required]),
    descrizione: new FormControl(this.pianoConti?.descrizione,[Validators.required]),
    tipo: new FormControl(this.pianoConti?.tipo,[Validators.required]),
    parentId: new FormControl(this.pianoConti?.parentCodice || '-'),
    children: new FormControl(this.pianoConti?.children)

  });
  this.pianoForm.disable();
 }

 transformTipo(tipo: string): string {
  return tipo === 'ATTIVITA' ? 'ATTIVITÀ' : tipo === 'PASSIVITA' ? 'PASSIVITÀ' : tipo;
}

 indietro(){
  this.router.navigate(['/contabilita/piano-dei-conti']);
 }
}
