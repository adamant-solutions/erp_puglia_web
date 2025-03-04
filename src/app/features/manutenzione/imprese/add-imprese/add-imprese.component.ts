import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Imprese } from 'src/app/core/models/manutenzione.model';
import { comuni, provinces } from 'src/app/core/models/province-data.model';
import { ImpreseService } from 'src/app/core/services/manutenzione-services/imprese.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-imprese',
  templateUrl: './add-imprese.component.html',
  styleUrls: ['./add-imprese.component.css']
})
export class AddImpreseComponent {
  pageTitle: string = 'Nuova Imprese';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Imprese', link: '/manutenzione/imprese' },
  ];

  form!: NgForm;
  impresa : Imprese = {
    id: -1,
    ragioneSociale: '',
    partitaIva: '',
    codiceFiscale: '',
    indirizzo: '',
    citta: '',
    provincia: '',
    cap: '',
    telefono: '',
    email: '',
    pec: ''
  };
  submitted: boolean = false;
  provinces = [...provinces]
  comuni = [...comuni]
  filteredComuni: any[] = [];

  private impreseService = inject(ImpreseService);
  private router = inject(Router);
  private notifService = inject(NotificationService);

  selectProvincia(event: any){
    const province = event.target.value;
    if (province) {
      this.filteredComuni = this.comuni.filter(
        c => c.provincia === province
      );
    }
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if(form.invalid){
      return;
    }
    else {
 
      console.log('Dati Impresa:', this.impresa);

      this.impreseService.addImprese(this.impresa).subscribe({
        next: (res) => {
         /*  alert('Dati salvati con successo!'); */
          this.notifService.addNotification({
            message: 'Impresa salvata con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['/manutenzione/imprese']);
        },
        error: (err) =>{
          this.notifService.addNotification({
            message: "Si è verificato un errore!",
            type: 'error',
            timeout: 5000,
          });
        }
      })

    }
  }

  
  indietro() {
    this.router.navigate(['/manutenzione/imprese']);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
