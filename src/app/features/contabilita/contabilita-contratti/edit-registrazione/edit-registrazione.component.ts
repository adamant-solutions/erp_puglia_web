import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PianoDeiConti } from 'src/app/core/models/contabilita/piano-dei-conti.model';
import { TipoRegistrazione, RegistrazioneContabile } from 'src/app/core/models/contabilita/registrazione-contabile.model';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { RegistrazioneContabileService } from 'src/app/core/services/contabilita-services/registrazione-contabile.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-registrazione',
  templateUrl: './edit-registrazione.component.html',
  styleUrls: ['./edit-registrazione.component.css']
})
export class EditRegistrazioneComponent {
  pageTitle: string = '';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' }
  ];
  transactionForm!: FormGroup;
  contratti: ModelLight[] = [];
  contrattoId!: number;
  registerId!: number;
  tipoOptions: TipoRegistrazione[]= [
    TipoRegistrazione.DA_CONTRATTO, 
    TipoRegistrazione.DA_INCASSO,
    TipoRegistrazione.STORNO,
    TipoRegistrazione.MANUALE
  ];
  registrazione!: RegistrazioneContabile;
  submitted = false;
  editMode = false;
  loading = true;
  conti: PianoDeiConti[] = [];
  
  
    constructor(
      private fb: FormBuilder,
      private registrazioneService: RegistrazioneContabileService,
      private notifS: NotificationService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      const currentUrl = this.router.url;
      this.editMode = currentUrl.includes('modifica-registrazione');
      this.editMode ?  this.pageTitle = 'Modifica Registrazione Contabile' :  this.pageTitle = 'Dettagli Registrazione Contabile';
  
      this.contrattoId = +this.route.snapshot.params['id'];
      this.registerId = +this.route.snapshot.params['registerId'];
      this.breadcrumbList = [
        { label: 'ERP - di Regione Puglia', link: '/' },
        { label: 'Contabilità', link: '/contabilita' },
        { label: 'Contratti locazione', link: '/contabilita/contabilita-contratti' },
        { label: 'Registrazioni Contabile', link: `/contabilita/contabilita-contratti/${this.contrattoId}/registrazioni` },
      ];
  
      this.route.data.subscribe({
        next: (data) => {
          this.conti = data['pianoDeiContiResolver'];
          this.contratti = data['contrattiLightResolver'] as ModelLight[];
          this.registrazione = data['registrazioniContabileByIdResolver']
        }
        });
    }
  
    ngOnInit(): void {
      this.initForm();
    }
    get movimenti(): FormArray {
      return this.transactionForm.get('movimenti') as FormArray;
    }

  
initForm(): void {

  this.transactionForm = this.fb.group({
    id: [this.registrazione.id],
    dataRegistrazione: [{value: this.registrazione.dataRegistrazione, disabled: true}, Validators.required],
    dataCompetenza: [this.registrazione.dataCompetenza, Validators.required],
    numeroProtocollo: [this.registrazione.numeroProtocollo, Validators.required],
    tipo: [{value: this.registrazione.tipo, disabled: true}, Validators.required],
    descrizione: [this.registrazione.descrizione],
    contrattoId: [{value: this.registrazione.contrattoId, disabled: true}, Validators.required],
    movimenti: this.fb.array([]),
    version: [this.registrazione.version]
  });
  

  const movimentiArray = this.transactionForm.get('movimenti') as FormArray;
  if (this.registrazione.movimenti && this.registrazione.movimenti.length > 0) {
    this.registrazione.movimenti.forEach(movimento => {
      movimentiArray.push(this.createMovement(
        movimento.importo,
        movimento.dare,
        movimento.contoId
      ));
    });
  }
}

createMovement(importo: any = 0, dare: boolean = true, contoId: number = 0): FormGroup {
  return this.fb.group({
    importo: [importo, [Validators.required, Validators.min(0.01)]],
    dare: [{value: dare, disabled: true}],
    contoId: [{value: contoId, disabled: true}, Validators.required]
});
}
  
toggleEditMode(): void {
  this.editMode = !this.editMode;
  this.updateFormControlsState();

  let baseUrl = this.router.url;

   if (this.editMode) {
    baseUrl = baseUrl.replace('visualizza-registrazione', 'modifica-registrazione');
  } else {
    baseUrl = baseUrl.replace('modifica-registrazione', 'visualizza-registrazione');
  } 
  
 // console.log('New URL:', baseUrl);
  this.router.navigate([baseUrl], { replaceUrl: true });
}

updateFormControlsState(): void {
  const movimentiArray = this.transactionForm.get('movimenti') as FormArray;
  
  // Campi  modificabile in modifica
  const dataCompetenzaControl = this.transactionForm.get('dataCompetenza')!;
  const numeroProtocolloControl = this.transactionForm.get('numeroProtocollo')!;
  const descrizioneControl = this.transactionForm.get('descrizione')!;
  
  if (this.editMode) {
    dataCompetenzaControl.enable();
    numeroProtocolloControl.enable();
    descrizioneControl.enable();
    
    for (let i = 0; i < movimentiArray.length; i++) {
      const movimentoGroup = movimentiArray.at(i) as FormGroup;
      movimentoGroup.get('importo')?.enable();
      movimentoGroup.get('isDare')?.enable();
      movimentoGroup.get('contoId')?.enable();
    }
  } else {
    dataCompetenzaControl.disable();
    numeroProtocolloControl.disable();
    descrizioneControl.disable();
    
    // Disabilita tutti i campi dei movimenti
    for (let i = 0; i < movimentiArray.length; i++) {
      const movimentoGroup = movimentiArray.at(i) as FormGroup;
      movimentoGroup.get('importo')?.disable();
      movimentoGroup.get('isDare')?.disable();
      movimentoGroup.get('contoId')?.disable();
    }
  }
}

onSubmit(): void {
  this.submitted = true;
  if (this.transactionForm.valid) {

  const formValue = this.transactionForm.getRawValue();
  
  this.registrazioneService.update(formValue.id,formValue).subscribe({
    next: (response) => {
      this.registrazione = response;
      this.notifS.addNotification({
        message: 'Registrazione contabile modificata con successo!',
        type: 'success',
        timeout: 3000,
      });
      this.editMode = false;
      this.updateFormControlsState();
  
      this.router.navigate([`/contabilita/contabilita-contratti/${this.contrattoId}/registrazioni`]);
    },
    error: (err) => {
      this.notifS.addNotification({
        message: err.error.message,
        type: 'error',
        timeout: 5000,
      });
    }
  })
}  else {
  this.markFormGroupTouched(this.transactionForm);
}
}


    markFormGroupTouched(formGroup: FormGroup): void {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach(ctrl => {
            if (ctrl instanceof FormGroup) {
              this.markFormGroupTouched(ctrl);
            } else {
              ctrl.markAsTouched();
            }
          });
        }
      });
    }
  
    hasError(controlName: string): boolean {
      const control = this.transactionForm.get(controlName);
      return control ? control.invalid && this.submitted : false;
    }

    indietro() {
      this.router.navigate([`/contabilita/contabilita-contratti/${this.contrattoId}/registrazioni`]);
    }
  
    resetForm() {
      this.initForm();
    }

    transformCodice(value: string){
      return value.replace(/^\d+ - /, '');
    }
  }
