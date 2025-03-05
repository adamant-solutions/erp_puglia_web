import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Piani } from 'src/app/core/models/manutenzione.model';
import { PianiService } from 'src/app/core/services/manutenzione-services/piani.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-piani',
  templateUrl: './edit-piani.component.html',
  styleUrls: ['./edit-piani.component.css']
})
export class EditPianiComponent {

pageTitle: string = 'Modifica Piano';
breadcrumbList = [
  { label: 'ERP - di Regione Puglia', link: '/' },
  { label: 'Manutenzione', link: '/manutenzione' },
  { label: 'Piani', link: '/manutenzione/piani' },
];
editForm!: FormGroup;
piano: Piani = {
  id: 0,
  anno: '',
  descrizione: '',
  budgetTotale: 0,
  budgetUtilizzato: 0,
  budgetResiduo: 0,
  note: ''
}
submitted: boolean = false;

private router = inject(Router);
private route = inject(ActivatedRoute);
constructor(private fb: FormBuilder,private pianoSrc: PianiService,private notificationService: NotificationService) {}
ngOnInit(): void {
  this.route.data.subscribe(({ data }) => {
    this.piano = data
    this.initForm();
  })
}

initForm() {
  this.editForm = this.fb.group({
    id: [this.piano.id],
    anno: [this.piano.anno,[Validators.required,Validators.pattern('^\\d{4}$')]],
    descrizione: [this.piano.descrizione,[Validators.required]],
    budgetTotale: [this.piano.budgetTotale,[Validators.required,Validators.pattern('^\\d*(\\.\\d+)?$')]],
    budgetUtilizzato: [this.piano.budgetUtilizzato,[Validators.required,Validators.pattern('^\\d*(\\.\\d+)?$')]],
    budgetResiduo: [this.piano.budgetResiduo,[Validators.required,Validators.pattern('^\\d*(\\.\\d+)?$')]],
    dataApprovazione: [this.piano.dataApprovazione],
    note: [this.piano.note],
  });
  if(this.editForm.get('dataApprovazione')?.getRawValue() !== null){
    this.editForm.get('dataApprovazione')?.disable()
  }
}  

onSubmit() {
  this.submitted = true;
  console.log('Form Submitted', this.editForm.value);
  if (this.editForm.valid) {
    console.log('Form Submitted', this.editForm.value);
    this.pianoSrc.editPiani(this.editForm.getRawValue()).subscribe({
      next: (res) => {
        this.notificationService.addNotification({
          message: 'Piano salvato con successo!',
          type: 'success',
          timeout: 3000,
        });
        this.router.navigate(['manutenzione/piani/piano-dettagli/' + this.piano.id]);
      },
      error: (err) =>{
        this.notificationService.addNotification({
          message: "Si è verificato un errore!",
          type: 'error',
          timeout: 5000,
        });
      }
    })

  }
}

resetForm() {
  this.editForm.reset(this.piano);
}


indietro() {
  this.router.navigate(['/manutenzione/piani']);
}

}
