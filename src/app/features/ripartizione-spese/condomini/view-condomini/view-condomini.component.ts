import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Condominio } from 'src/app/core/models/condominio.model';
import { CondominioService } from 'src/app/core/services/ripartizione-spese/condominio.service';

@Component({
  selector: 'app-view-condomini',
  templateUrl: './view-condomini.component.html',
  styleUrls: ['./view-condomini.component.css']
})
export class ViewCondominiComponent implements OnInit {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Condomini', link: '/ripartizione-spese/condomini' }
  ];

  pageTitle = 'Dettagli Condominio';
  viewForm: FormGroup;
  unitaImmobiliariList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private condominioService: CondominioService
  ) {
    this.viewForm = this.fb.group({
      id: [{value: '', disabled: true}],
      codice: [{value: '', disabled: true}],
      denominazione: [{value: '', disabled: true}],
      indirizzo: [{value: '', disabled: true}],
      comune: [{value: '', disabled: true}],
      provincia: [{value: '', disabled: true}],
      cap: [{value: '', disabled: true}],
      codiceFiscale: [{value: '', disabled: true}]
    });
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        if (data['condominio']) {
          this.viewForm.patchValue(data['condominio']);
          
      
          forkJoin({
            unitaIds: this.condominioService.getUnitaIdsForCondominio(data['condominio'].id),
            unitaList: this.condominioService.getUnitaImmobiliare()
          }).subscribe({
            next: (result) => {
             
              this.unitaImmobiliariList = result.unitaList
                .filter((unita: any) => result.unitaIds.includes(unita.id))
                .map((unita: any) => ({
                  id: unita.id,
                  descrizione: unita.descrizione
                }));
            },
            error: (error: any) => {
            
            }
          });
        }
      },
      error: (error) => {
       
      }
    });
  }

  indietro() {
    this.router.navigate(['ripartizione-spese/condomini']);
  }
}