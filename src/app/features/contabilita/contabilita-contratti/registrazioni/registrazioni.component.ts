import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrazioneContabile } from 'src/app/core/models/contabilita/registrazione-contabile.model';
import { ModelLight } from 'src/app/core/models/contratto.model';

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

  constructor() { }
  ngOnInit() {
      this.getList();
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const response = data['data']
        this.contratti = data['contrattiLightResolver'] as ModelLight[];
        console.log('Response from resolver:', response);
        this.registrazioni = response;
     
      }
      });
  }
  getContrattiDescrizione(id: number): string {
    const found = this.contratti.find((item: { id: number }) => item.id === id);
    return found?.descrizione.replace(/^\d+ - /, '') ?? '';
  }
}
