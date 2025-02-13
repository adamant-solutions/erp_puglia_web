import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Contratti, StatoContratto } from 'src/app/core/models/contratto.model';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { NotificationService } from 'src/app/core/services/notification.service';
interface SelectOption {
  id: number;
  descrizione: string;
}
declare var bootstrap: any;
@Component({
  selector: 'app-edit-contratti',
  templateUrl: './edit-contratti.component.html',
  styleUrls: ['./edit-contratti.component.css']
})
export class EditContrattiComponent {
  
  @ViewChild('confermaModal') confermaModal!: ElementRef;
  motivoFine: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  statoContrattoOptions: StatoContratto[] = ['ATTIVO', 'SCADUTO', 'DISDETTO', 'ANNULLATO'];
  id: number | null = null;
  documenti: any[] = [];
  unitaImmobiliariOptions: SelectOption[] = [];
  intestatariOptions: SelectOption[] = [];
  contratto!: Contratti;
  errorMsg = '';
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Contratti', link: '/contratti-locazione' },
  ];
editForm!:FormGroup
private modal: any;
  constructor(
    private route: ActivatedRoute,
    private contrattiService: ContrattiService,
    private fb: FormBuilder,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit() {
   
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
      }
    });

    this.route.data.subscribe(data => {
      this.unitaImmobiliariOptions = data['unitaImmobiliari'].body || [];
      this.intestatariOptions = data['intestatari'].body || [];
      this.contratto = data['contratto'] || [];
    });
    
    this.initForm();
    this.documenti = this.contratto.documenti || [];
  }
  ngAfterViewInit() {
 
    this.modal = new bootstrap.Modal(this.confermaModal.nativeElement, {
      keyboard: false
    });
  }
 
  private initForm() {
    this.editForm = this.fb.group({
      dataInizio: { value: this.contratto.dataInizio, disabled: true },
    dataFine: { value: this.contratto.dataFine, disabled: true },
      canoneMensile: { value: this.contratto.canoneMensile, disabled: true },
      statoContratto: this.contratto.statoContratto,
      descrizione: { value: this.contratto.descrizione, disabled: true },
      unitaImmobiliare: { value: { id: this.contratto.unitaImmobiliare }, disabled: true },
      intestatari: this.fb.array([]),
      documenti: this.fb.array([] ),
  
    });
    const intestatariArray = this.editForm.get('intestatari') as FormArray;
    this.contratto.intestatari.forEach((intestatario: any) => {
      intestatariArray.push(this.createIntestatarioGroup(intestatario));
    });
     
  }

  get intestatari(): FormArray {
    return this.editForm.get('intestatari') as FormArray;
  }

  addIntestatario() {
    this.intestatari.push(this.createIntestatarioGroup());
    console.log(this.intestatari)
  }
  
  removeIntestatario(index: number) {
    this.intestatari.removeAt(index);
  }

  private createIntestatarioGroup(intestatario?: any): FormGroup {
    return this.fb.group({
      intestatario: this.fb.group({
        id: [{ value: intestatario?.intestatario || null, disabled: true }, Validators.required]
      }),
      dataInizio: [{ value: intestatario?.dataInizio || null, disabled: true }, Validators.required]
    });
  }


 
  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }


  onUnitaImmobiliareChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.editForm.get('unitaImmobiliare')?.setValue(selectedId);
    
  }
 
  onIntestatariChange(anagrafica: any, index: number) {
    this.intestatari.at(index).get('intestatario.id')?.setValue(anagrafica.id);
    
  }

  
  confirmTermina() {
    if (this.motivoFine && this.contratto?.id) {
      this.contrattiService.terminaContratto(this.contratto.id, this.motivoFine).subscribe({
        next: () => {
          if (this.modal) {
            this.modal.hide();
          }
          this.notifService.addNotification({
            message: 'Il contratto è stato terminato con successo!',
            type: 'success',
            timeout: 3000,
          });

          this.router.navigate(['/contratti-locazione']);
        },
        error: (error) => {
          this.notifService.addNotification({
            message: 'Si è verificato un errore.Il contratto non è stato terminato!',
            type: 'error',
            timeout: 5000,
          });
        }
      });
    }
  }


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

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.editForm.valid) {
      const statoContratto = this.editForm.get('statoContratto')?.value;
      
      if (statoContratto) {
       
        this.contrattiService.updateStato(+id, statoContratto).subscribe({
          next: (response) => {
            this.notifService.addNotification({
              message: 'Lo stato è stato aggiornato con successo!',
              type: 'success',
              timeout: 3000,
            });
            this.router.navigate(['/contratti-locazione']);
          },
          error: (error) => {
            this.notifService.addNotification({
              message: this.handleError(error.error),
              type: 'error',
              timeout: 5000,
            });
            console.error('Errore nell\'aggiornamento dello stato:', error);
          }
        });
      }
    }
  }

  private handleError(error: any) : string{
    switch (error.status) {
      case 400:
        return this.errorMsg = 'Dati non validi. Controlla i campi obbligatori.';
      case 422:
        return this.errorMsg = 'Dati non validi o contratto già esistente.';
      case 500:
        return this.errorMsg = error.message;
      default:
        return this.errorMsg = 'Errore durante il salvataggio del contratto.';
    }
  }

  openConfermaModal() {
    if (!this.modal) {
      this.modal = new bootstrap.Modal(this.confermaModal.nativeElement, {
        keyboard: false
      });
    }
    this.modal.show();
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