import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css'],
})
export class AnagraficaComponent implements OnInit {
  pageTitle: string = 'Anagrafica';

  breadcrumbList = [{ label: 'ERP - di Regione Puglia', link: '/' }];

  anagraficaList: Anagrafica[] = [];

  anagraficaId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private anagraficaService: AnagraficaService,
    private bootstrapService: BootstrapService
  ) {}

  ngOnInit(): void {
    this.getAnagraficaList();
  }

  getAnagraficaList() {
    this.activatedRoute.data
      .pipe(map((data) => data['anagraficaResolver']))
      .subscribe((response) => {
        this.anagraficaList = response;
      });
  }

  deleteAnagraficaModal(anagrafica: Anagrafica | any) {
    this.anagraficaId = anagrafica.id;
    this.bootstrapService.showModal('deleteAnagraficaModal');
  }

  deleteAnagrafica() {
    this.anagraficaService.deleteAnagrafica(this.anagraficaId).subscribe({
      next: () => {
        // Update the list by filtering out the deleted item
        this.anagraficaList = this.anagraficaList.filter(
          (anagrafica) => anagrafica.id !== this.anagraficaId
        );
        // this.notificationService.success(`Anagrafica "${this.anagraficaId}" deleted successfully.`);
      },
      error: (error) => {
        console.error(error);
        // this.notificationService.error(`Failed to delete anagrafica "${this.anagraficaId}". Please try again.`);
      },
    });
  }
}
