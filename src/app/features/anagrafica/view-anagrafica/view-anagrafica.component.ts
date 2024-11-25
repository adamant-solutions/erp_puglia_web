import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-view-anagrafica',
  templateUrl: './view-anagrafica.component.html',
  styleUrls: ['./view-anagrafica.component.css'],
})
export class ViewAnagraficaComponent implements OnInit {
  pageTitle: string = 'Anagrafica dettagli';

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
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anagraficaByIdResolver }) => {
      this.anagrafica = anagraficaByIdResolver;
      console.log('anagraficaByIdResolver: ', anagraficaByIdResolver);
    });

    this.initForm();
  }

  initForm() {
    this.viewForm = this.formBuilder.group({
      idAnagrafica: [this.anagrafica.id],
      createDate: [this.anagrafica.createDate],
      lastUpdateDate: [this.anagrafica.lastUpdateDate],

      cittadino: this.formBuilder.group({
        idCittadino: [this.anagrafica.cittadino.id],
        createDate: [this.anagrafica.cittadino.createDate],
        lastUpdateDate: [this.anagrafica.cittadino.lastUpdateDate],
        nome: [this.anagrafica.cittadino.nome],
        cognome: [this.anagrafica.cittadino.cognome],
        codiceFiscale: [this.anagrafica.cittadino.codiceFiscale],
        genere: [this.anagrafica.cittadino.genere],
        cittadinanza: [this.anagrafica.cittadino.cittadinanza],
        dataDiNascita: [this.anagrafica.cittadino.dataDiNascita],
      }),
    });

    this.viewForm.disable();
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  onSubmit() {
    if (this.viewForm.valid) {
      console.log('Form data: ', this.viewForm.value);
    } else {
      // errors
    }
  }
}
