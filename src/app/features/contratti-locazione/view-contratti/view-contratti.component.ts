import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContrattiService } from 'src/app/core/services/contratti.service';
interface PatrimonioItem {
  id: number;
  descrizione: any;
}
@Component({
  selector: 'app-view-contratti',
  templateUrl: './view-contratti.component.html',
  styleUrls: ['./view-contratti.component.css']
})
export class ViewContrattiComponent {
  documenti: any[] = [];
  patrimonio: PatrimonioItem[] = [];
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contratti', link: '/contratti-locazione' },
  ];
  viewForm = this.fb.group({
    descrizione: [''],
    canoneMensile: [''],
    dataInizio: [''],
    dataFine: [''],
    statoContratto: [''],
    unitaImmobiliare: [''],
  
    nomeIntestatario: [''],
    cognomeIntestatario: [''],
    cfIntestatario: [''],
    cittadinanzaIntestatario: [''], 
    genereIntestatario: [''],
    
    residenzaIndirizzo: [''],
    residenzaCivico: [''],
    residenzaCap: [''],
    residenzaComune: [''],
    residenzaProvincia: [''],
    residenzaStato: [''],

    contattiTelefono: [''],
    contattiCellulare: [''],
    contattiEmail: [''],
    contattiPec: ['']
  
  });

  constructor(
    private route: ActivatedRoute,
    private contrattiService: ContrattiService,
    private fb: FormBuilder,
    private router:Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ contratto, unitaImmobiliareResolver }) => {
      if (!contratto) {
       
        return;
      }
  
     
      this.patrimonio = unitaImmobiliareResolver?.body || [];
  
  
      this.populateForm(contratto);
  
     
      this.documenti = contratto.documenti || [];
    });
  }
  private findPatrimonioDescription(unitaId: number): string {
    const unita = this.patrimonio.find((item: { id: number }) => item.id === unitaId);
    return unita?.descrizione;
  }

  private populateForm(contratto: any) {
   
    const unitaDescrizione = contratto.unitaImmobiliare?.descrizione 
      || this.findPatrimonioDescription(contratto.unitaImmobiliare);
  
 
    this.viewForm.patchValue({
      descrizione: contratto.descrizione,
      canoneMensile: contratto.canoneMensile,
      dataInizio: this.formatDate(contratto.dataInizio),
      dataFine: this.formatDate(contratto.dataFine),
      statoContratto: contratto.statoContratto,
      unitaImmobiliare: unitaDescrizione || 'N/A'
    });
  
  
    if (contratto.intestatariAttuali?.length > 0) {
      const intestatario = contratto.intestatariAttuali[0].cittadino;
      const residenza = intestatario.residenza;
      const contatti = intestatario.contatti;
  
      this.viewForm.patchValue({
        nomeIntestatario: intestatario.nome,
        cognomeIntestatario: intestatario.cognome,
        cfIntestatario: intestatario.codiceFiscale,
        cittadinanzaIntestatario: intestatario.cittadinanza,
        genereIntestatario: intestatario.genere,
        residenzaIndirizzo: residenza?.indirizzo,
        residenzaCivico: residenza?.civico,
        residenzaCap: residenza?.cap,
        residenzaComune: residenza?.comuneResidenza,
        residenzaProvincia: residenza?.provinciaResidenza,
        residenzaStato: residenza?.statoResidenza,
        contattiTelefono: contatti?.telefono,
        contattiCellulare: contatti?.cellulare,
        contattiEmail: contatti?.email,
        contattiPec: contatti?.pec
      });
    }
  }





  private formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toLocaleDateString() : '';
  }

  indietroC() {
    window.scrollTo({top:0, behavior:'smooth'})
    this.router.navigate(['/contratti-locazione']);
  }
}
