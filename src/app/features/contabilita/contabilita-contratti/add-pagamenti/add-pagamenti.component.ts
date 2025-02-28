import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PianoDeiConti } from 'src/app/core/models/contabilita/piano-dei-conti.model';
import { TipoRegistrazione, RegistrazioneContabile } from 'src/app/core/models/contabilita/registrazione-contabile.model';
import { ModelLight } from 'src/app/core/models/contratto.model';
import { PianoDeiContiService } from 'src/app/core/services/contabilita-services/piano-dei-conti.service';
import { RegistrazioneContabileService } from 'src/app/core/services/contabilita-services/registrazione-contabile.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-pagamenti',
  templateUrl: './add-pagamenti.component.html',
  styleUrls: ['./add-pagamenti.component.css']
})
export class AddPagamentiComponent {
 pageTitle = "Registrazione pagamento"

breadcrumbList = [
  { label: 'ERP - di Regione Puglia', link: '/' }
];

transactionForm!: FormGroup;
contratti: ModelLight[] = [];
contrattoId!: number;
tipoOptions: TipoRegistrazione[]= [
  TipoRegistrazione.DA_CONTRATTO, 
  TipoRegistrazione.DA_INCASSO,
  TipoRegistrazione.STORNO,
  TipoRegistrazione.MANUALE
];
conti!: PianoDeiConti[];
submitted = false;


  constructor(
    private fb: FormBuilder,
    private registrazioneService: RegistrazioneContabileService,
    private pianoCService: PianoDeiContiService,
    private notifS: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.contrattoId = +this.route.snapshot.params['id'];

    this.breadcrumbList = [
      { label: 'ERP - di Regione Puglia', link: '/' },
      { label: 'Contabilità', link: '/contabilita' },
      { label: 'Contratti locazione', link: '/contabilita/contabilita-contratti' },
      { label: 'Registrazioni Contabile', link: `/contabilita/contabilita-contratti/${this.contrattoId}/registrazioni` },
    ];

    this.route.data.subscribe({
      next: (data) => {
        this.contratti = data['contrattiLightResolver'] as ModelLight[];
        this.conti = data['pianoDeiContiResolver'];
      }
      });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const today = new Date().toISOString().split('T')[0];

    this.transactionForm = this.fb.group({
      dataRegistrazione: [today, Validators.required],
      dataCompetenza: ['', Validators.required],
      numeroProtocollo: ['', Validators.required],
      tipo: [{value: 'DA_INCASSO', disabled: true}, Validators.required],
      descrizione: [''],
      contrattoId: [{value: this.contrattoId, disabled: true}, Validators.required],
      movimenti: this.fb.array([
        this.createMovement('', true, 5),
        this.createMovement('', false, 3)
      ])
    });
  }

  createMovement(importo: any = 0, dare: boolean = true, contoId: number = 0): FormGroup {
    return this.fb.group({
      importo: [importo, [Validators.required, Validators.min(0.01)]],
      dare: [{value: dare, disabled: true}],
      contoId: [{value: contoId, disabled: true}, Validators.required]
    });
  }

  get movimenti(): FormArray {
    return this.transactionForm.get('movimenti') as FormArray;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.getRawValue() as RegistrazioneContabile;
      
      console.log('Submitted transaction:', formValue);
      
      this.registrazioneService.save(formValue).subscribe({
        next: (res) => {
          this.notifS.addNotification({
            message: 'Pagamento salvato con successo!',
            type: 'success',
            timeout: 3000,
          });
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
    } else {
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

  hasMovementError(index: number, controlName: string): boolean {
    const control = this.movimenti.at(index).get(controlName);
    return control ? control.invalid && this.submitted : false;
  }

  indietro() {
    this.router.navigate([`/contabilita/contabilita-contratti/${this.contrattoId}/registrazioni`]);
  }

  resetForm() {
    this.submitted = false;
    this.initForm();
  }
  transformCodice(value: string){
    return value.replace(/^\d+ - /, '');
  }
}
