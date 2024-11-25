import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-add-anagrafica',
  templateUrl: './add-anagrafica.component.html',
  styleUrls: ['./add-anagrafica.component.css'],
})
export class AddAnagraficaComponent implements OnInit {
  pageTitle: string = 'Nuova Anagrafica';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  anagrafica!: Anagrafica;

  addForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      idAnagrafica: [-1],

      cittadino: this.formBuilder.group({
        idCittadino: [],
        nome: [''],
        cognome: [''],
        codiceFiscale: [''],
        genere: [''],
        cittadinanza: [''],
        dataDiNascita: [''],
      }),
    });
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  onSubmit() {
    if (this.addForm.valid) {
      console.log('Form Data: ', this.addForm.value);
    } else {
      // errors
    }
  }
}
