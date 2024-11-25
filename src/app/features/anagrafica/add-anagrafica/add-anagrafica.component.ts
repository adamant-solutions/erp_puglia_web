import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';

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
    private router: Router,
    private anagraficaService: AnagraficaService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      id: [-1],
      cittadino: this.formBuilder.group({
        id: [],
        nome: [''],
        cognome: [''],
        codiceFiscale: [''],
        genere: [''],
        cittadinanza: [''],
        dataDiNascita: [''],
      }),
    });
  }

  cancel() {
    this.addForm.reset();
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    } else {
      console.log('Form Data: ', this.addForm.value);

      this.anagraficaService
        .addAnagrafica(this.addForm.getRawValue())
        .subscribe({
          next: (data: any) => {
            this.addForm.reset();
            this.router.navigate(['/anagrafica']);
          },
          error: (error: any) => {
            console.error('An error occurred while adding anagrafica:', error);
          },
        });
    }
  }
}
