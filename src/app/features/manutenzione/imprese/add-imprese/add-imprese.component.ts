import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Imprese } from 'src/app/core/models/manutenzione.model';
import { ImpreseService } from 'src/app/core/services/manutenzione-services/imprese.service';

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
  provinces = [
    { sigla: 'BA', nome: 'Bari' },
    { sigla: 'BT', nome: 'Barletta-Andria-Trani' },
    { sigla: 'BR', nome: 'Brindisi' },
    { sigla: 'FG', nome: 'Foggia' },
    { sigla: 'LE', nome: 'Lecce' },
    { sigla: 'TA', nome: 'Taranto' },
  ];

  private impreseService = inject(ImpreseService);
  private router = inject(Router);

  onSubmit(form: NgForm) {
    this.submitted = true;
    if(form.invalid){
      return;
    }
    else {
 
      console.log('Dati Impresa:', this.impresa);

      this.impreseService.addImprese(this.impresa).subscribe({
        next: (res) => {
          alert('Dati salvati con successo!');
          this.router.navigate(['/manutenzione/imprese']);
        },
        error: (err) =>{
          alert('Error!');
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
