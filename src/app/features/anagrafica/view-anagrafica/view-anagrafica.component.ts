import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-view-anagrafica',
  templateUrl: './view-anagrafica.component.html',
  styleUrls: ['./view-anagrafica.component.css'],
})
export class ViewAnagraficaComponent implements OnInit {
  pageTitle: string = 'Visualizza Anagrafica';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  anagrafica!: Anagrafica;

  viewForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.data.subscribe(({ anagraficaByIdResolver }) => {
      this.anagrafica = anagraficaByIdResolver;
      console.log('anagraficaByIdResolver: ', anagraficaByIdResolver);
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.viewForm = this.formBuilder.group({
      idAnagrafica: [this.anagrafica.id],
      nome: [this.anagrafica.cittadino.nome],
      cognome: [this.anagrafica.cittadino.cognome],
    });

    // this.disableInputs();
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  disableInputs() {
    Object.keys(this.viewForm.controls).forEach((key) => {
      const control = this.viewForm.get(key);
      if (control) {
        control.disable();
      }
    });
  }

  onSubmit() {
    if (this.viewForm.valid) {
      console.log('Form Data: ', this.viewForm.value);
    } else {
      // errors
    }
  }
}
