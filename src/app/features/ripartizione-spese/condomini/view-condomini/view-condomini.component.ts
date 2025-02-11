import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Condominio } from 'src/app/core/models/condominio.model';

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
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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