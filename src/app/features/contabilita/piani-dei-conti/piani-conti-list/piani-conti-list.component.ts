import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PianoDeiConti, TipoConto } from 'src/app/core/models/contabilita/piano-dei-conti.model';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { PianoDeiContiService } from 'src/app/core/services/contabilita-services/piano-dei-conti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-piani-conti-list',
  templateUrl: './piani-conti-list.component.html',
  styleUrls: ['./piani-conti-list.component.css']
})
export class PianiContiListComponent {
  pageTitle: string = 'Piano dei Conti';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contabilità', link: '/contabilita' },
  ];

  pianoDeiContiList: PianoDeiConti[]= [];
  private route = inject(ActivatedRoute); 

  filteredPiano: PianoDeiConti[] = [];

  selectedAccount: PianoDeiConti | null = null;
  isEditing = false;
  pianoId!: number;
  pianoItem : string = '';
  
  tipoConto : TipoConto[] = [
    TipoConto.ATTIVITA ,
    TipoConto.PASSIVITA, 
    TipoConto.COSTI,
    TipoConto.RICAVI,
    TipoConto.PATRIMONIO 
  ]
  
  searchTerm = '';

  constructor(
    private pianoDeiContiService: PianoDeiContiService,
    private notifService: NotificationService,
    private bootstrap: BootstrapService
  ) {}

  ngOnInit() {
      this.getList();

  }


  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['data']
       // console.log('Response from resolver:', response);
        this.pianoDeiContiList = response;
        this.filteredPiano = [...this.pianoDeiContiList]
      }
      });
  }

  
  filterByType(event: any): void {
    const TIPO = event?.target.value
    if (!TIPO) {
      this.getList()
      return;
    }

    this.pianoDeiContiService.findByTipo(TIPO).pipe(
      map((items: PianoDeiConti[]) => {
        items.forEach(item => {
          if (item.parentId) {
            const parentItem = items.find(parent => parent.id === item.parentId);
            if (parentItem) {
              item.parentCodice = parentItem.codice;
            }
          }
        });
        return items;
      })
    ).subscribe({
      next: (value) => {
        this.filteredPiano = [...value];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  transformTipo(tipo: string): string {
    return tipo === 'ATTIVITA' ? 'ATTIVITÀ' : tipo === 'PASSIVITA' ? 'PASSIVITÀ' : tipo;
  }
 

   
  deleteModal(item: PianoDeiConti) {
    this.pianoId = item.id;
    this.pianoItem = item.codice + '-' + item.descrizione;
    this.bootstrap.showModal('deletePianoModal');
  }

  delete() {
    this.pianoDeiContiService.delete(this.pianoId).subscribe({
      next: () => {
        this.pianoDeiContiList = this.pianoDeiContiList.filter(
          (item) => item.id !== this.pianoId
        );
        this.notifService.addNotification({
          message: 'Eliminato con successo!',
          type: 'success',
          timeout: 3000
        })
      },
      error: (error: any) => {
        console.error(error);
        this.notifService.addNotification({
          message: 'Eliminazione non completata, si è verificato un errore.',
          type: 'error',
          timeout: 5000
        })
      },
    });
  }

}
