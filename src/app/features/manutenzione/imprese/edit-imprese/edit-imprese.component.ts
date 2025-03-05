import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imprese } from 'src/app/core/models/manutenzione.model';
import { comuni, provinces } from 'src/app/core/models/province-data.model';
import { ImpreseService } from 'src/app/core/services/manutenzione-services/imprese.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-imprese',
  templateUrl: './edit-imprese.component.html',
  styleUrls: ['./edit-imprese.component.css']
})
export class EditImpreseComponent {
  pageTitle: string = 'Modifica Impresa';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Manutenzione', link: '/manutenzione' },
    { label: 'Imprese', link: '/manutenzione/imprese' },
  ];
  submitted: boolean = false;
  impresaForm!: FormGroup;
  impresa: Imprese = {
    id: 0,
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
  }
  
  provinces = [...provinces]
  comuni = [...comuni]
  filteredComuni: any[] = [];


  private impreseService = inject(ImpreseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  constructor(private fb: FormBuilder, private notificationService: NotificationService) {}

  ngOnInit(): void {
 
    this.route.data.subscribe(({ data }) => {
      this.impresa = data
      this.initForm();

      this.impresaForm.get('provincia')?.valueChanges.subscribe(selectedProvincia => {
        this.filteredComuni = this.comuni.filter(comune => comune.provincia === selectedProvincia);
        if (this.impresaForm.get('provincia')?.value !== selectedProvincia) {
          this.impresaForm.get('citta')?.reset();
        }
      });
  
      if (this.impresa.provincia) {
        this.filteredComuni = this.comuni.filter(
          c => c.provincia === this.impresa.provincia
        );
      }
    })

/*   
   console.log("Province:" ,this.impresaForm.get('provincia'))
   console.log("Citta:" ,this.impresaForm.get('citta')) */
  }

  initForm() {
    this.impresaForm = this.fb.group({
      id: [this.impresa.id],
      ragioneSociale: [this.impresa.ragioneSociale, Validators.required],
      partitaIva: [this.impresa.partitaIva, [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      codiceFiscale: [this.impresa.codiceFiscale, [Validators.required, Validators.pattern(/^[A-Z0-9]{16}$/)]],
      indirizzo: [this.impresa.indirizzo],
      citta: [this.impresa.citta],
      provincia: [this.impresa.provincia],
      cap: [this.impresa.cap, [Validators.pattern(/^[0-9]{5}$/)]],
      telefono: [this.impresa.telefono, [Validators.pattern(/^[0-9]+$/)]],
      email: [this.impresa.email, [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      pec: [this.impresa.pec, [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@pec\.it$/)]],
    });
  }

  onSubmit() {
    this.submitted = true;
  if (this.impresaForm.valid) { 
      console.log('Form Submitted', this.impresaForm.value);
      this.impreseService.editImprese(this.impresaForm.value).subscribe({
        next: (res) => {
          this.notificationService.addNotification({
            message: 'Impresa salvata con successo!',
            type: 'success',
            timeout: 3000,
          });
          this.router.navigate(['manutenzione/imprese/imprese-dettagli/' + res.id]);
        },
        error: (err) => {
          this.notificationService.addNotification({
            message: "Si è verificato un errore!",
            type: 'error',
            timeout: 5000,
          });
        }
      });
     }  
  }

  resetForm() {
    this.impresaForm.reset(this.impresa);
  }

  indietro() {
    this.router.navigate(['/manutenzione/imprese']);
  }


}
