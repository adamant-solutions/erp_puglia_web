import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatoContratto } from 'src/app/core/models/contratto.model';
import { ContrattiService } from 'src/app/core/services/contratti.service';
interface SelectOption {
  id: number;
  descrizione: string;
}
@Component({
  selector: 'app-edit-contratti',
  templateUrl: './edit-contratti.component.html',
  styleUrls: ['./edit-contratti.component.css']
})
export class EditContrattiComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  statoContrattoOptions: StatoContratto[] = ['ATTIVO', 'SCADUTO', 'DISDETTO', 'ANNULLATO'];
  id: number | null = null;
  documenti: any[] = [];
  unitaImmobiliariOptions: SelectOption[] = [];
  intestatariOptions: SelectOption[] = [];
  
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contratti', link: '/contratti-locazione' },
  ];

  editForm = this.fb.group({
    descrizione: ['', Validators.required],
    canoneMensile: ['', [Validators.required, Validators.min(0)]],
    dataInizio: ['', Validators.required],
    dataFine: ['', Validators.required],
    statoContratto: ['', Validators.required],
    unitaImmobiliare: ['', Validators.required],
    
    nomeIntestatario: ['', Validators.required],
    cognomeIntestatario: ['', Validators.required],
    cfIntestatario: ['', [Validators.required, Validators.pattern(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/)]],
    cittadinanzaIntestatario: ['', Validators.required],
    genereIntestatario: ['', Validators.required],
    
    residenzaIndirizzo: ['', Validators.required],
    residenzaCivico: ['', Validators.required],
    residenzaCap: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    residenzaComune: ['', Validators.required],
    residenzaProvincia: ['', Validators.required],
    residenzaStato: ['', Validators.required],
    
    contattiTelefono: ['', Validators.pattern(/^\d{10}$/)],
    contattiCellulare: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    contattiEmail: ['', [Validators.required, Validators.email]],
    contattiPec: ['', [Validators.required, Validators.email]],


    unitaImmobiliareId: ['', Validators.required],
    intestatarioId: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private contrattiService: ContrattiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
  
    this.route.data.subscribe(data => {
      this.unitaImmobiliariOptions = data['unitaImmobiliari'].body || [];
      this.intestatariOptions = data['intestatari'].body || [];
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contrattiService.getContrattiById(+id).subscribe(contratto => {
        this.populateForm(contratto);
        this.documenti = contratto.documenti || [];
      });
    }
  }

  private populateForm(contratto: any) {
    this.editForm.patchValue({
      descrizione: contratto.descrizione,
      canoneMensile: contratto.canoneMensile,
      dataInizio: this.formatDateForInput(contratto.dataInizio),
      dataFine: this.formatDateForInput(contratto.dataFine),
      statoContratto: contratto.statoContratto,
      unitaImmobiliare: contratto.unitaImmobiliare,
      unitaImmobiliareId: contratto.unitaImmobiliareId,
      intestatarioId: contratto.intestatarioId
    });

    if (contratto.intestatariAttuali?.length > 0) {
      const intestatario = contratto.intestatariAttuali[0].cittadino;
      const residenza = intestatario.residenza;
      const contatti = intestatario.contatti;
      
      this.editForm.patchValue({
        nomeIntestatario: intestatario.nome,
        cognomeIntestatario: intestatario.cognome,
        cfIntestatario: intestatario.codiceFiscale,
        cittadinanzaIntestatario: intestatario.cittadinanza,
        genereIntestatario: intestatario.genere,
        
        residenzaIndirizzo: residenza?.indirizzo,
        residenzaCivico: residenza?.civico,
        residenzaCap: residenza?.cap,
        residenzaComune: residenza?.comuneResidenza,
        residenzaProvincia: residenza?.provinciaResidenza,
        residenzaStato: residenza?.statoResidenza,
        
        contattiTelefono: contatti?.telefono,
        contattiCellulare: contatti?.cellulare,
        contattiEmail: contatti?.email,
        contattiPec: contatti?.pec
      });
    }
  }

  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  // onSubmit() {
  //   if (this.editForm.valid) {
  //     const id = this.route.snapshot.paramMap.get('id');
  //     if (id) {
  //       const formData = this.editForm.value;
  //       this.contrattiService.updateContratto(+id, formData).subscribe({
  //         next: () => {
  //         
  //           this.router.navigate(['/contratti-locazione']);
  //         },
  //         error: (error) => {
  //         
  //           console.error('Error updating contract:', error);
  //         }
  //       });
  //     }
  //   } else {
  //     Object.keys(this.editForm.controls).forEach(key => {
  //       const control = this.editForm.get(key);
  //       if (control?.invalid) {
  //         control.markAsTouched();
  //       }
  //     });
  //   }
  // }

  indietroC() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.router.navigate(['/contratti-locazione']);
  }
  uploadDocument() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && this.id) {
      const formData = new FormData();
      formData.append('file', file);
      
      this.contrattiService.uploadDocument(this.id, formData).subscribe({
        next: (doc) => {
          this.documenti.push(doc);
          event.target.value = ''; 
        },
        error: (error) => {
          console.error('Upload error:', error);
        }
      });
    }
  }


  getErrorMessage(controlName: string): string {
    const control = this.editForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Campo obbligatorio';
    }
    if (control?.hasError('email')) {
      return 'Email non valida';
    }
    if (control?.hasError('pattern')) {
      switch (controlName) {
        case 'cfIntestatario':
          return 'Codice fiscale non valido';
        case 'residenzaCap':
          return 'CAP non valido';
        case 'contattiTelefono':
        case 'contattiCellulare':
          return 'Numero non valido';
        default:
          return 'Formato non valido';
      }
    }
    return '';
  }
}