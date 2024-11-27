import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  submitted: boolean = false;

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
        // id: [],
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        codiceFiscale: ['', Validators.required],
        genere: ['', Validators.required],
        cittadinanza: ['', Validators.required],
        dataDiNascita: [''],
        residenza: this.formBuilder.group({
          indirizzo: [''],
          civico: [''],
          cap: [''],
          comuneResidenza: [''],
          provinciaResidenza: [''],
          statoResidenza: [''],
        }),
        contatti: this.formBuilder.group({
          telefono: [''],
          cellulare: [''],
          email: [''],
          pec: [''],
        }),
        luogo_nascita: this.formBuilder.group({
          comune: [''],
          provincia: [''],
          stato: [''],
        }),
      }),
    });
  }

  cancelForm() {
    this.addForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    console.log('Form controls: ', this.addForm.controls);
    console.log('Form data: ', this.addForm.value);

    if (this.addForm.invalid) {
      return;
    } else {
      this.anagraficaService
        .addAnagrafica(this.addForm.getRawValue())
        .subscribe({
          next: (data: any) => {
            console.log('Form data (response): ', data);
            this.addForm.reset();
            this.submitted = false;
            this.router.navigate(['/anagrafica']);
          },
          error: (error: any) => {
            console.error('An error occurred while adding anagrafica:', error);
          },
        });
    }
  }
}
