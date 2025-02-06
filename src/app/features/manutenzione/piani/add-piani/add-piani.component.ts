import { Component, inject } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Piani } from 'src/app/core/models/manutenzione.model';
import { PianiService } from 'src/app/core/services/manutenzione-services/piani.service';

@Component({
  selector: 'app-add-piani',
  templateUrl: './add-piani.component.html',
  styleUrls: ['./add-piani.component.css']
})
export class AddPianiComponent {

  
pageTitle: string = 'Aggiungi Piano';
breadcrumbList = [
  { label: 'ERP - di Regione Puglia', link: '/' },
  { label: 'Piani', link: '/manutenzione/piani' },
];

piano: Piani = {
  id: -1,
  anno: '',
  descrizione: '',
  budgetTotale: '',
  budgetUtilizzato: '',
  budgetResiduo: '',
  dataApprovazione: '',
  note: ''
}

private router = inject(Router);
constructor(private fb: FormBuilder,private pianoSrc: PianiService) {}

ngOnInit(): void {
}

onSubmit(form: NgForm) {
  if (form.valid) {
    console.log('Form Submitted', form.value);
    this.pianoSrc.addPiani(form.value).subscribe({
      next: (res) => {
        alert('Dati salvati con successo!');
        this.router.navigate(['manutenzione/piani/piano-dettagli/' + res.id]);
      },
      error: (err) =>{
        alert('Error!');
      }
    })

  }
}

resetForm(form: any) {
  form.reset();
}


indietro() {
  this.router.navigate(['/manutenzione/piani']);
}

}
