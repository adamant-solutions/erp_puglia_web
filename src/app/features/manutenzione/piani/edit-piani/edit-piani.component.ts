import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Piani } from 'src/app/core/models/manutenzione.model';
import { PianiService } from 'src/app/core/services/manutenzione-services/piani.service';

@Component({
  selector: 'app-edit-piani',
  templateUrl: './edit-piani.component.html',
  styleUrls: ['./edit-piani.component.css']
})
export class EditPianiComponent {

pageTitle: string = 'Modifica Piano';
breadcrumbList = [
  { label: 'ERP - di Regione Puglia', link: '/' },
  { label: 'Manuntenzione', link: '/manutenzione' },
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

private router = inject(Router);
private route = inject(ActivatedRoute);
constructor(private fb: FormBuilder,private pianoSrc: PianiService) {}
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
  console.log('Form Submitted', this.editForm.value);
  if (this.editForm.valid) {
    console.log('Form Submitted', this.editForm.value);
    this.pianoSrc.editPiani(this.editForm.getRawValue()).subscribe({
      next: (res) => {
        alert('Dati salvati con successo!');
        this.router.navigate(['manutenzione/piani/piano-dettagli/' + this.piano.id]);
      },
      error: (err) =>{
        alert('Error!');
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
