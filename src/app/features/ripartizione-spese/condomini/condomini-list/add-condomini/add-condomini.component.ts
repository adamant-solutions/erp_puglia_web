import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CondominioService } from 'src/app/core/services/ripartizione-spese/condominio.service';

@Component({
  selector: 'app-add-condomini',
  templateUrl: './add-condomini.component.html',
  styleUrls: ['./add-condomini.component.css']
})
export class AddCondominiComponent {
  addForm: FormGroup;
  breadcrumbList: any[] = [
    { label: 'Home', url: '/' },
    { label: 'Condomini', url: 'ripartizione-spese/condomini' },
    
  ];
  pageTitle = 'Nuovo condominio';
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private condominioService: CondominioService,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      codice: ['', Validators.required],
      denominazione: ['', Validators.required],
      indirizzo: ['', Validators.required],
      comune: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.maxLength(2)]],
      cap: ['', Validators.required],
      codiceFiscale: ['', Validators.required],
      version: [1]
    });
  }

  shouldShowError(fieldName: string): boolean {
    const field = this.addForm.get(fieldName);
    return field ? field.invalid && this.submitted : false;
  }

  onSubmit(): void {
    this.submitted = true; 

    if (this.addForm.valid) {
      this.condominioService.createCondominio(this.addForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['ripartizione-spese/condomini']);
          },
          error: (error) => {
            console.error('Error creating condominio:', error);
          }
        });
    }
  }

  indietro(): void {
    this.router.navigate(['ripartizione-spese/condomini']);
  }
}

