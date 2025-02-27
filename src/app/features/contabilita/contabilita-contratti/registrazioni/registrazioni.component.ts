import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrazioneContabile, TipoRegistrazione } from 'src/app/core/models/contabilita/registrazione-contabile.model';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { RegistrazioneContabileService } from 'src/app/core/services/contabilita-services/registrazione-contabile.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    { label: 'Contratti locazione', link: '/contabilita/contabilita-contratti' },
  ];

  registrazioni: RegistrazioneContabile[]= [];
  registerId!: number;
  registerDescrizione: string = '';
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

  constructor(private registrazioneS: RegistrazioneContabileService,private bootstrap: BootstrapService,private notificationServ: NotificationService) { }
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

   
  deleteModal(item: RegistrazioneContabile) {
    this.registerId = item.id;
    this.registerDescrizione = item.descrizione;
    this.bootstrap.showModal('deleteRegistrazioneModal');
  }

  deleteRegistrazione() {
    this.registrazioneS.delete(this.registerId).subscribe({
      next: () => {
        this.registrazioni = this.registrazioni.filter(
          (item) => item.id !== this.registerId
        );
      },
      error: (error: any) => {
        console.error(error);
        this.notificationServ.addNotification({
          message: 'Eliminazione non completata, si è verificato un errore.',
          type: 'error',
          timeout: 5000
        })
      },
    });
  }

}
