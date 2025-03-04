import { Component, inject } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Piani } from 'src/app/core/models/manutenzione.model';
import { PianiService } from 'src/app/core/services/manutenzione-services/piani.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-piani',
  templateUrl: './add-piani.component.html',
  styleUrls: ['./add-piani.component.css']
})
export class AddPianiComponent {

  
pageTitle: string = 'Aggiungi Piano';
breadcrumbList = [
  { label: 'ERP - di Regione Puglia', link: '/' },
  { label: 'Manutenzione', link: '/manutenzione' },
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
submitted: boolean = false;
constructor(private fb: FormBuilder,private pianoSrc: PianiService,private notificationService: NotificationService) {}

ngOnInit(): void {
}

onSubmit(form: NgForm) {
  this.submitted = true;
  if (form.valid) {
    console.log('Form Submitted', form.value);
    this.pianoSrc.addPiani(form.value).subscribe({
      next: (res) => {
        this.notificationService.addNotification({
          message: 'Piano salvato con successo!',
          type: 'success',
          timeout: 3000,
        });
        this.router.navigate(['manutenzione/piani/piano-dettagli/' + res.id]);
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

resetForm(form: any) {
  form.reset();
}


indietro() {
  this.router.navigate(['/manutenzione/piani']);
}

}
