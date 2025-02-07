import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Sollecito } from 'src/app/core/models/sollecito.model';
import { SollecitoService } from 'src/app/core/services/sollecito.service';
declare var bootstrap: any; 
@Component({
  selector: 'app-solleciti',
  templateUrl: './solleciti.component.html',
  styleUrls: ['./solleciti.component.css']
})
export class SollecitiComponent {
  breadcrumbList : any=   []
  sollecitiList: Sollecito[] = [];
  morositaId: number;
  private deleteModal: any;
  private sollecitoToDelete: number | null = null;
  constructor(private route: ActivatedRoute,
    private sollecitoService: SollecitoService) {
    this.morositaId = this.route.snapshot.params['morositaId'];
  }
  ngOnInit() {
 
    this.route.parent?.params.subscribe(params => {
      this.morositaId = +params['id']; 
    });

    this.route.data.subscribe(data => {
      this.sollecitiList = data['sollecitiResolver'] || [];
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.breadcrumbList = [
      { label: 'ERP - di Regione Puglia', link: '/' },
      { label: 'Morosità', link: '/morosita' },
      { label: 'Dettagli Morosità', link: `/morosita/view-morosita/${this.morositaId}` }
    ];
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  }

  openDeleteModal(sollecito: Sollecito) {
    if (!this.morositaId) {
      console.error('MorositaId not found');
      return;
    }
    this.sollecitoToDelete = sollecito.id;
    this.deleteModal.show();
  }


  confirmDelete() {
    if (this.sollecitoToDelete && this.morositaId) {
      this.sollecitoService.deleteSollecito(this.morositaId, this.sollecitoToDelete)
        .subscribe({
          next: () => {
          
            this.sollecitiList = this.sollecitiList.filter(s => s.id !== this.sollecitoToDelete);
            
            this.deleteModal.hide();
         
            this.sollecitoToDelete = null;
          },
          error: (error) => {
            console.error('Error deleting sollecito:', error);
            this.deleteModal.hide();
          }
        });
    }
  }
}
