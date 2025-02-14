import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodiGestione } from 'src/app/core/models/periodi-gestione.model';
import { PeriodoGestioneService } from 'src/app/core/services/ripartizione-spese/periodi-gestione.service';

@Component({
  selector: 'app-edit-periodi-gestione',
  templateUrl: './edit-periodi-gestione.component.html',
  styleUrls: ['./edit-periodi-gestione.component.css']
})
export class EditPeriodiGestioneComponent implements OnInit {
  periodoForm: FormGroup;
  periodoId!: number;
  formSubmitted = false; 
  
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Periodi di Gestione', link: '/periodi' }
  ];

  validationMessages = {
    dataInizio: 'Data Inizio obbligatoria',
    dataFine: 'Data Fine obbligatoria',
    stato: 'Stato obbligatorio'
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private periodoService: PeriodoGestioneService
  ) {
    this.periodoForm = this.fb.group({
      dataInizio: ['', Validators.required],
      dataFine: ['', Validators.required],
      stato: ['', Validators.required],
      note: [''],
      condominioId: ['', Validators.required],
      version: ['', Validators.required]
    });
  }


  isFieldInvalid(fieldName: string): boolean {
    const field = this.periodoForm.get(fieldName);
    return field ? (field.invalid && this.formSubmitted) : false;
  }

  getErrorMessage(fieldName: string): string {
    return this.validationMessages[fieldName as keyof typeof this.validationMessages] || '';
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        if (data['periodoByIdResolver']) {
          const periodo = data['periodoByIdResolver'];
          this.periodoId = periodo.id;
          
          const dataInizio = periodo.dataInizio ? new Date(periodo.dataInizio).toISOString().split('T')[0] : '';
          const dataFine = periodo.dataFine ? new Date(periodo.dataFine).toISOString().split('T')[0] : '';
          
          this.periodoForm.patchValue({
            dataInizio: dataInizio,
            dataFine: dataFine,
            stato: periodo.stato,
            note: periodo.note,
            condominioId: periodo.condominioId,
            version: periodo.version
          });
        }
      },
      error: (error) => {
    
      }
    });
  }

  onSubmit() {
    this.formSubmitted = true; 
    
    if (this.periodoForm.invalid) {
      return; 
    }

    const formValue = this.periodoForm.value;
    const periodoData: PeriodiGestione = {
      id: this.periodoId,
      dataInizio: formValue.dataInizio,
      dataFine: formValue.dataFine,
      stato: formValue.stato,
      note: formValue.note,
      condominioId: formValue.condominioId,
      version: formValue.version
    };

    this.periodoService.updatePeriodo(this.periodoId, periodoData).subscribe({
      next: () => {
        this.router.navigate(['ripartizione-spese/periodi-gestione']);
      },
      error: (error) => {
        if (error.status === 400) {
         
        }
      }
    });
  }

  onCancel() {
    this.router.navigate(['ripartizione-spese/periodi-gestione']);
  }
}