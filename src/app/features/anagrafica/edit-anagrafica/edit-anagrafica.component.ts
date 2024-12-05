import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';

@Component({
  selector: 'app-edit-anagrafica',
  templateUrl: './edit-anagrafica.component.html',
  styleUrls: ['./edit-anagrafica.component.css'],
})
export class EditAnagraficaComponent implements OnInit {
  pageTitle: string = 'Modifica Anagrafica';

  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];

  anagrafica!: Anagrafica;
  anagraficaId!: number;
  modificaForm!: FormGroup;
  initialFormValues!: Anagrafica;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private anagraficaService: AnagraficaService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anagraficaByIdResolver }) => {
      this.anagrafica = anagraficaByIdResolver;
      console.log('anagraficaByIdResolver:', anagraficaByIdResolver);

      this.anagraficaId = anagraficaByIdResolver.id;
      console.log('Anagrafica ID:', this.anagraficaId);
    });

    this.initForm();
  }

  initForm() {
    this.modificaForm = this.formBuilder.group({
      id: [this.anagrafica.id],

      cittadino: this.formBuilder.group({
        id: [this.anagrafica.cittadino.id],

        nome: [this.anagrafica.cittadino.nome, Validators.required],
        cognome: [this.anagrafica.cittadino.cognome, Validators.required],
        codiceFiscale: [
          this.anagrafica.cittadino.codiceFiscale,
          Validators.required,
        ],
        genere: [this.anagrafica.cittadino.genere, Validators.required],
        cittadinanza: [
          this.anagrafica.cittadino.cittadinanza,
          Validators.required,
        ],
        dataDiNascita: [this.anagrafica.cittadino.dataDiNascita],

        residenza: this.formBuilder.group({
          id: [this.anagrafica.cittadino.residenza.id],

          indirizzo: [this.anagrafica.cittadino.residenza.indirizzo],
          civico: [this.anagrafica.cittadino.residenza.civico],
          cap: [this.anagrafica.cittadino.residenza.cap],
          comuneResidenza: [
            this.anagrafica.cittadino.residenza.comuneResidenza,
          ],
          provinciaResidenza: [
            this.anagrafica.cittadino.residenza.provinciaResidenza,
          ],
          statoResidenza: [this.anagrafica.cittadino.residenza.statoResidenza],
        }),
        contatti: this.formBuilder.group({
          id: [this.anagrafica.cittadino.contatti.id],

          telefono: [this.anagrafica.cittadino.contatti.telefono],
          cellulare: [this.anagrafica.cittadino.contatti.cellulare],
          email: [this.anagrafica.cittadino.contatti.email],
          pec: [this.anagrafica.cittadino.contatti.pec],
        }),
        luogo_nascita: this.formBuilder.group({
          comune: [this.anagrafica.cittadino.luogo_nascita.comune],
          provincia: [this.anagrafica.cittadino.luogo_nascita.provincia],
          stato: [this.anagrafica.cittadino.luogo_nascita.stato],
        }),
      }),
    });

    this.initialFormValues = this.modificaForm.getRawValue();
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  resetForm() {
    // this.modificaForm.reset();
    // this.initForm();
    this.modificaForm.reset(this.initialFormValues);
  }

  onSubmit() {
    this.submitted = true;

    console.log('Form controls:', this.modificaForm.controls);
    console.log('Form data:', this.modificaForm.value);

    if (this.modificaForm.invalid) {
      return;
    } else {
      this.anagraficaService
        .modificaAnagrafica(this.modificaForm.getRawValue())
        .subscribe({
          next: (data: any) => {
            console.log('Form data (response):', data);

            this.submitted = false;

            // Success message here ...

            // this.router.navigate(['/anagrafica/modifica-anagrafica', this.anagraficaId]);
            window.location.reload();
          },
          error: (error: any) => {
            console.error(
              'An error occurred while modifying anagrafica:',
              error
            );
          },
        });
    }
  }
}
