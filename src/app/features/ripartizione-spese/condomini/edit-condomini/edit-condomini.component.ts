import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Condominio } from 'src/app/core/models/condominio.model';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { CondominioService } from 'src/app/core/services/ripartizione-spese/condominio.service';

@Component({
  selector: 'app-edit-condomini',
  templateUrl: './edit-condomini.component.html',
  styleUrls: ['./edit-condomini.component.css']
})
export class EditCondominiComponent implements OnInit {
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Condomini', link: '/condomini' }
  ];
  @ViewChild('unitaSelect') unitaSelect!: ElementRef;
  pageTitle = 'Modifica Condominio';
  editForm: FormGroup;
  unitaImmobiliariList: ModelLight[] = [];
  selectedUnitaImmobiliari: ModelLight[] = [];
  condominioId!: number;
  selectedUnitaId: string = '';
  formSubmitAttempted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private condominioService: CondominioService
  ) {
    this.formSubmitAttempted = false;
    this.editForm = this.fb.group({
      id: [''],
      codice: ['', Validators.required],
      denominazione: ['', Validators.required],
      indirizzo: ['', Validators.required],
      comune: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.maxLength(2)]],
      cap: ['', Validators.required],
      codiceFiscale: ['', Validators.required],
      version: [0]
    });
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        if (data['condominio']) {
          const condominio = data['condominio'];
          this.condominioId = condominio.id;
          this.editForm.patchValue(condominio);
          this.loadUnitaImmobiliari();
        }
      },
      error: (error) => {
   
      }
    });

    this.route.data.subscribe({
      next: (data) => {
        if (data['unitaImmobiliari']?.body) {
          this.unitaImmobiliariList = data['unitaImmobiliari'].body;
        }
      },
      error: (error) => {
    
      }
    });
  }

  shouldShowError(controlName: string): boolean {
    const control = this.editForm.get(controlName);
    return !!(control && control.invalid && this.formSubmitAttempted);
  }

  loadUnitaImmobiliari() {
    this.condominioService.getUnitaIdsForCondominio(this.condominioId).subscribe({
      next: (unitaIds) => {
        this.selectedUnitaImmobiliari = this.unitaImmobiliariList.filter(
          unita => unitaIds.includes(unita.id)
        );
      },
      error: (error) => {
   
      }
    });
  }

  onSubmit() {
    this.formSubmitAttempted = true;
    
    if (this.editForm.valid) {
      const updatedCondominio = {
        ...this.editForm.value,
        unitaImmobiliari: this.selectedUnitaImmobiliari
      };
  
      this.condominioService.updateCondominio(updatedCondominio).subscribe({
        next: () => {
          this.router.navigate(['ripartizione-spese/condomini']);
        },
        error: (error) => {
        
        }
      });
    }
  }


  addUnitaImmobiliare(unitaId: string) {
    if (!unitaId) return;

    const numericUnitaId = +unitaId;
    const unita = this.unitaImmobiliariList.find(u => u.id === numericUnitaId);

    if (unita && !this.selectedUnitaImmobiliari.find(u => u.id === unita.id)) {
      this.condominioService.addUnitaToCondominio(this.condominioId, numericUnitaId).subscribe({
        next: () => {
          this.selectedUnitaImmobiliari.push(unita);
          this.selectedUnitaId = '';
        },
        error: (error) => {
        
        }
      });
    }
  }

  removeUnitaImmobiliare(unitaId: number) {
    this.condominioService.removeUnitaFromCondominio(this.condominioId, unitaId).subscribe({
      next: () => {
        this.selectedUnitaImmobiliari = this.selectedUnitaImmobiliari.filter(
          u => u.id !== unitaId
        );
      },
      error: (error) => {
       
      }
    });
  }

  indietro() {
    this.router.navigate(['ripartizione-spese/condomini']);
  }
}