import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { NotificationService } from 'src/app/core/services/notification.service';
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
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private condominioService: CondominioService,
    private notificationService: NotificationService
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
        }
        if (data['unitaImmobiliari']?.body) {
          this.unitaImmobiliariList = data['unitaImmobiliari'].body;
        }
        const { unitaIds, unitaList } = data['condominioUnitasResolver'];

        this.selectedUnitaImmobiliari = unitaList.filter((unita: any) => unitaIds.includes(unita.id));
      },
      error: (error) => {
   
      }
    });

  }

  shouldShowError(controlName: string): boolean {
    const control = this.editForm.get(controlName);
    return !!(control && control.invalid && this.formSubmitAttempted);
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
          this.notificationService.addNotification({
            message: 'Condominio è stato salvato con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['ripartizione-spese/condomini']);
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: this.handleError(error.error),
            type: 'error',
            timeout: 5000,
          });
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
          this.notificationService.addNotification({
            message: 'Unità immobiliare è stato salvato con successo!',
            type: 'success',
            timeout: 3000,
          });
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: this.handleError(error.error),
            type: 'error',
            timeout: 5000,
          });
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

  
  private handleError(error: any) : string{
    switch (error.status) {
      case 400:
        return this.errorMsg = 'Dati non validi. Controlla i campi obbligatori.';
      case 422:
        return this.errorMsg = 'Dati non validi o condominio già esistente.';
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = 'Errore durante il salvataggio del condominio.';
    }
  }

}