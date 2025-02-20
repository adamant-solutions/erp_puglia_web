import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CondominioService } from 'src/app/core/services/ripartizione-spese/condominio.service';

@Component({
  selector: 'app-add-condomini',
  templateUrl: './add-condomini.component.html',
  styleUrls: ['./add-condomini.component.css']
})
export class AddCondominiComponent implements OnInit {
  addForm: FormGroup;
  breadcrumbList: any[] = [
    { label: 'Home', url: '/' },
    { label: 'Condomini', url: 'ripartizione-spese/condomini' },
  ];
  pageTitle = 'Nuovo condominio';
  submitted = false;
  errorMsg: string = '';

  provinces = [
    { sigla: 'BA', nome: 'Bari' },
    { sigla: 'BT', nome: 'Barletta-Andria-Trani' },
    { sigla: 'BR', nome: 'Brindisi' },
    { sigla: 'FG', nome: 'Foggia' },
    { sigla: 'LE', nome: 'Lecce' },
    { sigla: 'TA', nome: 'Taranto' },
  ];

  comuni = [
    { nome: 'Acquaviva delle Fonti', provincia: 'BA' },
    { nome: 'Adelfia', provincia: 'BA' },
    { nome: 'Alberobello', provincia: 'BA' },
    { nome: 'Altamura', provincia: 'BA' },
    { nome: 'Bari', provincia: 'BA' },
    { nome: 'Binetto', provincia: 'BA' },
    { nome: 'Bitetto', provincia: 'BA' },
    { nome: 'Bitonto', provincia: 'BA' },
    { nome: 'Bitritto', provincia: 'BA' },
    { nome: 'Capurso', provincia: 'BA' },
    { nome: 'Casamassima', provincia: 'BA' },
    { nome: 'Cassano delle Murge', provincia: 'BA' },
    { nome: 'Castellana Grotte', provincia: 'BA' },
    { nome: 'Cellamare', provincia: 'BA' },
    { nome: 'Conversano', provincia: 'BA' },
    { nome: 'Corato', provincia: 'BA' },
    { nome: 'Gioia del Colle', provincia: 'BA' },
    { nome: 'Giovinazzo', provincia: 'BA' },
    { nome: 'Gravina in Puglia', provincia: 'BA' },
    { nome: 'Grumo Appula', provincia: 'BA' },
    { nome: 'Locorotondo', provincia: 'BA' },
    { nome: 'Modugno', provincia: 'BA' },
    { nome: 'Mola di Bari', provincia: 'BA' },
    { nome: 'Molfetta', provincia: 'BA' },
    { nome: 'Monopoli', provincia: 'BA' },
    { nome: 'Noci', provincia: 'BA' },
    { nome: 'Noicattaro', provincia: 'BA' },
    { nome: 'Palo del Colle', provincia: 'BA' },
    { nome: 'Poggiorsini', provincia: 'BA' },
    { nome: 'Polignano a Mare', provincia: 'BA' },
    { nome: 'Putignano', provincia: 'BA' },
    { nome: 'Rutigliano', provincia: 'BA' },
    { nome: 'Ruvo di Puglia', provincia: 'BA' },
    { nome: 'Sammichele di Bari', provincia: 'BA' },
    { nome: 'Sannicandro di Bari', provincia: 'BA' },
    { nome: 'Santeramo in Colle', provincia: 'BA' },
    { nome: 'Terlizzi', provincia: 'BA' },
    { nome: 'Toritto', provincia: 'BA' },
    { nome: 'Triggiano', provincia: 'BA' },
    { nome: 'Turi', provincia: 'BA' },
    { nome: 'Valenzano', provincia: 'BA' },
    { nome: 'Andria', provincia: 'BT' },
    { nome: 'Barletta', provincia: 'BT' },
    { nome: 'Bisceglie', provincia: 'BT' },
    { nome: 'Canosa di Puglia', provincia: 'BT' },
    { nome: 'Margherita di Savoia', provincia: 'BT' },
    { nome: 'Minervino Murge', provincia: 'BT' },
    { nome: 'San Ferdinando di Puglia', provincia: 'BT' },
    { nome: 'Spinazzola', provincia: 'BT' },
    { nome: 'Trani', provincia: 'BT' },
    { nome: 'Trinitapoli', provincia: 'BT' },
    { nome: 'Brindisi', provincia: 'BR' },
    { nome: 'Carovigno', provincia: 'BR' },
    { nome: 'Ceglie Messapica', provincia: 'BR' },
    { nome: 'Cellino San Marco', provincia: 'BR' },
    { nome: 'Cisternino', provincia: 'BR' },
    { nome: 'Erchie', provincia: 'BR' },
    { nome: 'Fasano', provincia: 'BR' },
    { nome: 'Francavilla Fontana', provincia: 'BR' },
    { nome: 'Latiano', provincia: 'BR' },
    { nome: 'Mesagne', provincia: 'BR' },
    { nome: 'Oria', provincia: 'BR' },
    { nome: 'Ostuni', provincia: 'BR' },
    { nome: 'San Donaci', provincia: 'BR' },
    { nome: 'San Michele Salentino', provincia: 'BR' },
    { nome: 'San Pancrazio Salentino', provincia: 'BR' },
    { nome: 'San Pietro Vernotico', provincia: 'BR' },
    { nome: 'San Vito dei Normanni', provincia: 'BR' },
    { nome: 'Torchiarolo', provincia: 'BR' },
    { nome: 'Torre Santa Susanna', provincia: 'BR' },
    { nome: 'Villa Castelli', provincia: 'BR' },
    { nome: 'Accadia', provincia: 'FG' },
    { nome: 'Alberona', provincia: 'FG' },
    { nome: 'Anzano di Puglia', provincia: 'FG' },
    { nome: 'Apricena', provincia: 'FG' },
    { nome: 'Ascoli Satriano', provincia: 'FG' },
    { nome: 'Biccari', provincia: 'FG' },
    { nome: 'Bovino', provincia: 'FG' },
    { nome: 'Candela', provincia: 'FG' },
    { nome: 'Carapelle', provincia: 'FG' },
    { nome: 'Carlantino', provincia: 'FG' },
    { nome: 'Carpino', provincia: 'FG' },
    { nome: 'Casalnuovo Monterotaro', provincia: 'FG' },
    { nome: 'Casalvecchio di Puglia', provincia: 'FG' },
    { nome: 'Castelluccio dei Sauri', provincia: 'FG' },
    { nome: 'Castelluccio Valmaggiore', provincia: 'FG' },
    { nome: 'Castelnuovo della Daunia', provincia: 'FG' },
    { nome: 'Celenza Valfortore', provincia: 'FG' },
    { nome: 'Celle di San Vito', provincia: 'FG' },
    { nome: 'Cerignola', provincia: 'FG' },
    { nome: 'Chieuti', provincia: 'FG' },
    { nome: 'Deliceto', provincia: 'FG' },
    { nome: 'Faeto', provincia: 'FG' },
    { nome: 'Foggia', provincia: 'FG' },
    { nome: 'Ischitella', provincia: 'FG' },
    { nome: 'Isole Tremiti', provincia: 'FG' },
    { nome: 'Lesina', provincia: 'FG' },
    { nome: 'Lucera', provincia: 'FG' },
    { nome: 'Manfredonia', provincia: 'FG' },
    { nome: 'Mattinata', provincia: 'FG' },
    { nome: "Monte Sant'Angelo", provincia: 'FG' },
    { nome: 'Monteleone di Puglia', provincia: 'FG' },
    { nome: 'Motta Montecorvino', provincia: 'FG' },
    { nome: 'Ordona', provincia: 'FG' },
    { nome: 'Orsara di Puglia', provincia: 'FG' },
    { nome: 'Orta Nova', provincia: 'FG' },
    { nome: 'Panni', provincia: 'FG' },
    { nome: 'Peschici', provincia: 'FG' },
    { nome: 'Pietramontecorvino', provincia: 'FG' },
    { nome: 'Poggio Imperiale', provincia: 'FG' },
    { nome: 'Rignano Garganico', provincia: 'FG' },
    { nome: "Rocchetta Sant'Antonio", provincia: 'FG' },
    { nome: 'Rodi Garganico', provincia: 'FG' },
    { nome: 'Roseto Valfortore', provincia: 'FG' },
    { nome: 'San Giovanni Rotondo', provincia: 'FG' },
    { nome: 'San Marco in Lamis', provincia: 'FG' },
    { nome: 'San Marco la Catola', provincia: 'FG' },
    { nome: 'San Nicandro Garganico', provincia: 'FG' },
    { nome: 'San Paolo di Civitate', provincia: 'FG' },
    { nome: 'San Severo', provincia: 'FG' },
    { nome: "Sant'Agata di Puglia", provincia: 'FG' },
    { nome: 'Serracapriola', provincia: 'FG' },
    { nome: 'Stornara', provincia: 'FG' },
    { nome: 'Stornarella', provincia: 'FG' },
    { nome: 'Torremaggiore', provincia: 'FG' },
    { nome: 'Troia', provincia: 'FG' },
    { nome: 'Vico del Gargano', provincia: 'FG' },
    { nome: 'Vieste', provincia: 'FG' },
    { nome: 'Volturara Appula', provincia: 'FG' },
    { nome: 'Volturino', provincia: 'FG' },
    { nome: 'Zapponeta', provincia: 'FG' },
    { nome: 'Acquarica del Capo', provincia: 'LE' },
    { nome: 'Alessano', provincia: 'LE' },
    { nome: 'Alezio', provincia: 'LE' },
    { nome: 'Alliste', provincia: 'LE' },
    { nome: 'Andrano', provincia: 'LE' },
    { nome: 'Aradeo', provincia: 'LE' },
    { nome: 'Arnesano', provincia: 'LE' },
    { nome: 'Bagnolo del Salento', provincia: 'LE' },
    { nome: 'Botrugno', provincia: 'LE' },
    { nome: 'Calimera', provincia: 'LE' },
    { nome: 'Campi Salentina', provincia: 'LE' },
    { nome: 'Cannole', provincia: 'LE' },
    { nome: 'Caprarica di Lecce', provincia: 'LE' },
    { nome: 'Carmiano', provincia: 'LE' },
    { nome: 'Carpignano Salentino', provincia: 'LE' },
    { nome: 'Casarano', provincia: 'LE' },
    { nome: 'Castri di Lecce', provincia: 'LE' },
    { nome: 'Castrignano dei Greci', provincia: 'LE' },
    { nome: 'Castrignano del Capo', provincia: 'LE' },
    { nome: 'Cavallino', provincia: 'LE' },
    { nome: 'Collepasso', provincia: 'LE' },
    { nome: 'Copertino', provincia: 'LE' },
    { nome: "Corigliano d'Otranto", provincia: 'LE' },
    { nome: 'Corsano', provincia: 'LE' },
    { nome: 'Cursi', provincia: 'LE' },
    { nome: 'Cutrofiano', provincia: 'LE' },
    { nome: 'Diso', provincia: 'LE' },
    { nome: 'Gagliano del Capo', provincia: 'LE' },
    { nome: 'Galatina', provincia: 'LE' },
    { nome: 'Galatone', provincia: 'LE' },
    { nome: 'Gallipoli', provincia: 'LE' },
    { nome: 'Giuggianello', provincia: 'LE' },
    { nome: 'Giurdignano', provincia: 'LE' },
    { nome: 'Guagnano', provincia: 'LE' },
    { nome: 'Lecce', provincia: 'LE' },
    { nome: 'Lequile', provincia: 'LE' },
    { nome: 'Leverano', provincia: 'LE' },
    { nome: 'Lizzanello', provincia: 'LE' },
    { nome: 'Maglie', provincia: 'LE' },
    { nome: 'Martano', provincia: 'LE' },
    { nome: 'Martignano', provincia: 'LE' },
    { nome: 'Matino', provincia: 'LE' },
    { nome: 'Melendugno', provincia: 'LE' },
    { nome: 'Melissano', provincia: 'LE' },
    { nome: 'Melpignano', provincia: 'LE' },
    { nome: 'Miggiano', provincia: 'LE' },
    { nome: 'Minervino di Lecce', provincia: 'LE' },
    { nome: 'Monteroni di Lecce', provincia: 'LE' },
    { nome: 'Montesano Salentino', provincia: 'LE' },
    { nome: 'Morciano di Leuca', provincia: 'LE' },
    { nome: 'Muro Leccese', provincia: 'LE' },
    { nome: 'Nardò', provincia: 'LE' },
    { nome: 'Neviano', provincia: 'LE' },
    { nome: 'Nociglia', provincia: 'LE' },
    { nome: 'Novoli', provincia: 'LE' },
    { nome: 'Ortelle', provincia: 'LE' },
    { nome: 'Otranto', provincia: 'LE' },
    { nome: 'Palmariggi', provincia: 'LE' },
    { nome: 'Parabita', provincia: 'LE' },
    { nome: 'Patù', provincia: 'LE' },
    { nome: 'Poggiardo', provincia: 'LE' },
    { nome: 'Porto Cesareo', provincia: 'LE' },
    { nome: 'Presicce', provincia: 'LE' },
    { nome: 'Racale', provincia: 'LE' },
    { nome: 'Ruffano', provincia: 'LE' },
    { nome: 'Salice Salentino', provincia: 'LE' },
    { nome: 'Salve', provincia: 'LE' },
    { nome: 'San Cassiano', provincia: 'LE' },
    { nome: 'San Cesario di Lecce', provincia: 'LE' },
    { nome: 'San Donato di Lecce', provincia: 'LE' },
    { nome: 'Sannicola', provincia: 'LE' },
    { nome: 'San Pietro in Lama', provincia: 'LE' },
    { nome: 'Santa Cesarea Terme', provincia: 'LE' },
    { nome: 'Scorrano', provincia: 'LE' },
    { nome: 'Seclì', provincia: 'LE' },
    { nome: 'Sogliano Cavour', provincia: 'LE' },
    { nome: 'Soleto', provincia: 'LE' },
    { nome: 'Specchia', provincia: 'LE' },
    { nome: 'Spongano', provincia: 'LE' },
    { nome: 'Squinzano', provincia: 'LE' },
    { nome: 'Sternatia', provincia: 'LE' },
    { nome: 'Supersano', provincia: 'LE' },
    { nome: 'Surano', provincia: 'LE' },
    { nome: 'Surbo', provincia: 'LE' },
    { nome: 'Taurisano', provincia: 'LE' },
    { nome: 'Taviano', provincia: 'LE' },
    { nome: 'Tiggiano', provincia: 'LE' },
    { nome: 'Trepuzzi', provincia: 'LE' },
    { nome: 'Tricase', provincia: 'LE' },
    { nome: 'Tuglie', provincia: 'LE' },
    { nome: 'Ugento', provincia: 'LE' },
    { nome: 'Uggiano la Chiesa', provincia: 'LE' },
    { nome: 'Veglie', provincia: 'LE' },
    { nome: 'Vernole', provincia: 'LE' },
    { nome: 'Zollino', provincia: 'LE' },
    { nome: 'Avetrana', provincia: 'TA' },
    { nome: 'Carosino', provincia: 'TA' },
    { nome: 'Castellaneta', provincia: 'TA' },
    { nome: 'Crispiano', provincia: 'TA' },
    { nome: 'Faggiano', provincia: 'TA' },
    { nome: 'Fragagnano', provincia: 'TA' },
    { nome: 'Ginosa', provincia: 'TA' },
    { nome: 'Grottaglie', provincia: 'TA' },
    { nome: 'Laterza', provincia: 'TA' },
    { nome: 'Leporano', provincia: 'TA' },
    { nome: 'Lizzano', provincia: 'TA' },
    { nome: 'Manduria', provincia: 'TA' },
    { nome: 'Martina Franca', provincia: 'TA' },
    { nome: 'Maruggio', provincia: 'TA' },
    { nome: 'Massafra', provincia: 'TA' },
    { nome: 'Monteiasi', provincia: 'TA' },
    { nome: 'Montemesola', provincia: 'TA' },
    { nome: 'Monteparano', provincia: 'TA' },
    { nome: 'Mottola', provincia: 'TA' },
    { nome: 'Palagianello', provincia: 'TA' },
    { nome: 'Palagiano', provincia: 'TA' },
    { nome: 'Pulsano', provincia: 'TA' },
    { nome: 'Roccaforzata', provincia: 'TA' },
    { nome: 'San Giorgio Ionico', provincia: 'TA' },
    { nome: 'San Marzano di San Giuseppe', provincia: 'TA' },
    { nome: 'Sava', provincia: 'TA' },
    { nome: 'Statte', provincia: 'TA' },
    { nome: 'Taranto', provincia: 'TA' },
    { nome: 'Torricella', provincia: 'TA' },
  ];


  filteredComuni: any[] = [];

  constructor(
    private fb: FormBuilder,
    private condominioService: CondominioService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.addForm = this.fb.group({
      codice: ['', Validators.required],
      denominazione: ['', Validators.required],
      indirizzo: ['', [Validators.required,Validators.minLength(5)]],
      comune: ['', Validators.required],
      provincia: ['', Validators.required],
      cap: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern('^[0-9]*$')
      ]],
      codiceFiscale: ['', Validators.required],
      version: [1]
    });
  }

  ngOnInit(): void {
    this.addForm.get('provincia')?.valueChanges.subscribe(selectedProvincia => {
      this.filteredComuni = this.comuni.filter(comune => comune.provincia === selectedProvincia);
      this.addForm.get('comune')?.reset();
    });
  }

  shouldShowError(fieldName: string): boolean {
    const field = this.addForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched || this.submitted)) : false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addForm.valid) {
      this.condominioService.createCondominio(this.addForm.value)
        .subscribe({
          next: () => {
            this.notificationService.addNotification({
              message: 'Condominio è stato salvato con successo!',
              type: 'success',
              timeout: 3000,
            });
            this.router.navigate(['ripartizione-spese/condomini']);
          },
          error: (error) => {
            this.notificationService.addNotification({
              message: this.handleError(error),
              type: 'error',
              timeout: 5000,
            });
          }
        });
    }
  }

  private handleError(err: any): string {
    switch (err.status) {
      case 400:
        return 'Il codice fiscale deve essere composto da 11 cifre numeriche';
      case 422:
        return 'Dati non validi o condominio già esistente.';
      case 500:
        return err.error.message;
      default:
        return 'Errore durante il salvataggio del condominio.';
    }
  }

  onCapKeyPress(event: KeyboardEvent): boolean {
  
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  indietro(): void {
    this.router.navigate(['ripartizione-spese/condomini']);
  }
}