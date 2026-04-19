import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { Intestatari } from 'src/app/core/models/contratto.model';

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
  intestatari: Intestatari[] = [];
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
    private fb: FormBuilder,
    private router: Router,
    private anagraficaService: AnagraficaService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ contratto, unitaImmobiliareResolver }) => {
      if (!contratto) {
        return;
      }

      this.patrimonio = unitaImmobiliareResolver?.body || [];
      this.documenti = contratto.documenti || [];
      this.intestatari = contratto.intestatari || [];
      this.populateForm(contratto);
    });
  }

   toggleAccordion(targetId: string): void {  
    const collapseElement = document.getElementById(targetId);  
    if (collapseElement) {  
      // toggle the visibility  
      const bootstrapCollapse = new bootstrap.Collapse(collapseElement, {  
        toggle: true  
      });   
      const isCollapsed = collapseElement.classList.contains("show");  
      if (isCollapsed) {  
        bootstrapCollapse.hide();  
      } else {  
        bootstrapCollapse.show();  
      }  
    }  
  }  

 
  private findPatrimonioDescription(unitaId: number | undefined): string {
    if (unitaId == null) return '';
    const unita = this.patrimonio.find((item: { id: number }) => item.id === unitaId);
    return unita?.descrizione;
  }

  private populateForm(contratto: any) {
    const unitaId: number = contratto.unitaImmobiliareId ?? contratto.unitaImmobiliare?.id ?? contratto.unitaImmobiliare;
    const unitaDescrizione = contratto.indirizzoUnitaImmobiliare
      || this.findPatrimonioDescription(unitaId);

    this.viewForm.patchValue({
      descrizione: contratto.descrizione,
      canoneMensile: contratto.canoneMensile,
      dataInizio: this.formatDate(contratto.dataInizio),
      dataFine: this.formatDate(contratto.dataFine),
      statoContratto: contratto.statoContratto,
      unitaImmobiliare: unitaDescrizione || 'N/A'
    });

    // Dopo lo split del bounded context, il DTO pubblico del contratto espone solo
    // id/nome/cognome degli intestatari (arricchiti lato backend via anagrafica-service).
    // Per CF, cittadinanza, genere, residenza, contatti dobbiamo chiamare esplicitamente
    // anagrafica-service con l'ID dell'intestatario attuale.
    const intestatariAttuali: Intestatari[] = (contratto.intestatari || [])
      .filter((i: Intestatari) => !i.dataFine);
    const intestatarioAttuale = intestatariAttuali[0];
    if (!intestatarioAttuale) {
      return;
    }

    this.viewForm.patchValue({
      nomeIntestatario: intestatarioAttuale.nomeIntestatario,
      cognomeIntestatario: intestatarioAttuale.cognomeIntestatario,
    });

    const anagraficaId = intestatarioAttuale.intestatarioId;
    if (!anagraficaId) {
      return;
    }
    this.anagraficaService.getAnagraficaById(anagraficaId).subscribe({
      next: (anagrafica: any) => {
        const cittadino = anagrafica?.cittadino;
        if (!cittadino) return;
        const residenza = cittadino.residenza;
        const contatti = cittadino.contatti;
        this.viewForm.patchValue({
          nomeIntestatario: cittadino.nome,
          cognomeIntestatario: cittadino.cognome,
          cfIntestatario: cittadino.codiceFiscale,
          cittadinanzaIntestatario: cittadino.cittadinanza,
          genereIntestatario: cittadino.genere,
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
      },
      error: () => {
        // Anagrafica non raggiungibile: manteniamo solo nome/cognome gia' popolati.
      }
    });
  }





  private formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toLocaleDateString('it-IT') : '';
  }

  indietroC() {
    window.scrollTo({top:0, behavior:'smooth'})
    this.router.navigate(['/contratti-locazione']);
  }
}
