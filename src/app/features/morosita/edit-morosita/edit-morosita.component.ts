import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Morosita } from 'src/app/core/models/morosita.model';
import { MorositaService } from 'src/app/core/services/morosita.service';

@Component({
  selector: 'app-edit-morosita',
  templateUrl: './edit-morosita.component.html',
  styleUrls: ['./edit-morosita.component.css']
})
export class EditMorositaComponent implements OnInit {
  editForm:FormGroup;
  
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Morosità', link: '/morosita' },
  ];
  morositaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private morositaService: MorositaService
  ) {
    this.editForm = this.fb.group({
      contrattoId: ['', Validators.required],
      dataRilevazione: ['', Validators.required],
      dataScadenza: ['', Validators.required],
      importoDovuto: ['', [Validators.required, Validators.min(0)]],
      importoVersato: ['', [Validators.required, Validators.min(0)]],
      importoMorosita: ['', [Validators.required, Validators.min(0)]],
      stato: ['', Validators.required],
      tentativiContatto: ['', [Validators.required, Validators.min(0)]],
      modalitaContatto: ['', Validators.required],
      esitoContatto: ['', Validators.required],
      note: ['']
    });
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {

      if (data['morositaByIdResolver']) {
        const morosita: Morosita = data['morositaByIdResolver'];
    
        this.morositaId = morosita.id;
        this.editForm.patchValue(morosita);
      }
    });
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedMorosita: Morosita = {
        id: this.morositaId,
        ...this.editForm.value
      };

      this.morositaService.updateMorosita(this.morositaId, updatedMorosita)
        .subscribe({
          next: () => {
        
            this.router.navigate(['/morosita']);
          },
          error: (error) => {
           
       
          }
        });
    }
  }
  indietroM(): void {
    this.router.navigate(['/morosita']);
  }
}
