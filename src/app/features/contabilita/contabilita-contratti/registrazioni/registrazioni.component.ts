import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrazioneContabile, TipoRegistrazione } from 'src/app/core/models/contabilita/registrazione-contabile.model';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { RegistrazioneContabileService } from 'src/app/core/services/contabilita-services/registrazione-contabile.service';

@Component({
  selector: 'app-registrazioni',
  templateUrl: './registrazioni.component.html',
  styleUrls: ['./registrazioni.component.css']
})
export class RegistrazioniComponent {
  pageTitle: string = 'Registrazioni Contabile';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
  ];

  registrazioni: RegistrazioneContabile[]= [];
  contratti: ModelLight[] = []
  private route = inject(ActivatedRoute);
  searchDataInizioParam :any = '';
  searchDataFineParam :any = '';
  searchTipoParam :any = '';
  tipoOptions: TipoRegistrazione[]= [
    TipoRegistrazione.DA_CONTRATTO, 
    TipoRegistrazione.DA_INCASSO,
    TipoRegistrazione.STORNO,
    TipoRegistrazione.MANUALE
  ];

  constructor(private registrazioneS: RegistrazioneContabileService) { }
  ngOnInit() {
      this.getList();
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['data']
        this.contratti = data['contrattiLightResolver'] as ModelLight[];
      //  console.log('Response from resolver:', response);
        this.registrazioni = response;
     
      }
      });
  }
  
  getContrattiDescrizione(id: number): string {
    const found = this.contratti.find((item: { id: number }) => item.id === id);
    return found?.descrizione.replace(/^\d+ - /, '') ?? '';
  }

  getFilteredData(){
    this.registrazioneS.findByPeriodo(this.searchDataInizioParam,this.searchDataFineParam,this.searchTipoParam).subscribe({
      next: (response) => {
        this.registrazioni = [...response]
      }
    })
  }

  cancellaCerca(){
    this.searchDataInizioParam = null;
    this.searchDataFineParam = null;
    this.searchTipoParam = '';
    this.getList()
  }
}
