import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css'],
})
export class AnagraficaComponent implements OnInit {
  pageTitle: string = 'Anagrafica';

  anagrafica: Anagrafica[] = [
    {
      cittadino: {
        id: '123456789',
        codice_fiscale: 'RSSMRA85M01H501Z',
        nome: 'Mario',
        cognome: 'Rossi',
        data_nascita: '1985-01-01',
        luogo_nascita: {
          comune: 'Milano',
          provincia: 'MI',
          stato: 'Italia',
        },
        sesso: 'M',
        cittadinanza: 'Italiana',
      },
      residenza: {
        indirizzo: 'Via Roma',
        civico: 10,
        cap: '20121',
        comune_residenza: 'Milano',
        provincia_residenza: 'MI',
        stato_residenza: 'Italia',
      },
      contatti: {
        telefono: '+390212345678',
        email: 'mario.rossi@example.com',
        pec: 'mario.rossi@pec.example.com',
      },
      documenti_identita: [
        {
          tipo_documento: "Carta d'Identità",
          numero_documento: 'AI1234567',
          data_emissione: '2020-01-01',
          data_scadenza: '2030-01-01',
          ente_emittente: 'Comune di Milano',
        },
      ],
      altri_dettagli: {
        stato_civile: 'Single',
        data_ultimo_aggiornamento: '2024-01-01',
      },
    },

    {
      cittadino: {
        id: '987654321',
        codice_fiscale: 'BNCLRA90F20C351Z',
        nome: 'Laura',
        cognome: 'Bianchi',
        data_nascita: '1990-06-20',
        luogo_nascita: {
          comune: 'Roma',
          provincia: 'RM',
          stato: 'Italia',
        },
        sesso: 'F',
        cittadinanza: 'Italiana',
      },
      residenza: {
        indirizzo: 'Via Appia Nuova',
        civico: 123,
        cap: '00183',
        comune_residenza: 'Roma',
        provincia_residenza: 'RM',
        stato_residenza: 'Italia',
      },
      contatti: {
        telefono: '+390612345678',
        email: 'laura.bianchi@example.com',
        pec: 'laura.bianchi@pec.example.com',
      },
      documenti_identita: [
        {
          tipo_documento: 'Passaporto',
          numero_documento: 'YA7654321',
          data_emissione: '2018-06-20',
          data_scadenza: '2028-06-20',
          ente_emittente: 'Questura di Roma',
        },
        {
          tipo_documento: 'Patente',
          numero_documento: 'B12345678',
          data_emissione: '2015-06-20',
          data_scadenza: '2025-06-20',
          ente_emittente: 'Motorizzazione Civile',
        },
      ],
      altri_dettagli: {
        stato_civile: 'Sposato',
        data_ultimo_aggiornamento: '2024-11-01',
      },
    },

    {
      cittadino: {
        id: '654321987',
        codice_fiscale: 'VRDGNE70A01F205X',
        nome: 'Giovanni',
        cognome: 'Verdi',
        data_nascita: '1970-01-01',
        luogo_nascita: {
          comune: 'Napoli',
          provincia: 'NA',
          stato: 'Italia',
        },
        sesso: 'M',
        cittadinanza: 'Italiana',
      },
      residenza: {
        indirizzo: 'Via Toledo',
        civico: 45,
        cap: '80134',
        comune_residenza: 'Napoli',
        provincia_residenza: 'NA',
        stato_residenza: 'Italia',
      },
      contatti: {
        telefono: '+390812345678',
        email: 'giovanni.verdi@example.com',
        pec: 'giovanni.verdi@pec.example.com',
      },
      documenti_identita: [
        {
          tipo_documento: "Carta d'Identità",
          numero_documento: 'BN9876543',
          data_emissione: '2016-02-15',
          data_scadenza: '2026-02-15',
          ente_emittente: 'Comune di Napoli',
        },
      ],
      altri_dettagli: {
        stato_civile: 'Vedovo',
        data_ultimo_aggiornamento: '2024-07-15',
      },
    },

    {
      cittadino: {
        id: '1122334455',
        codice_fiscale: 'FNZGRA95L15D961Y',
        nome: 'Francesca',
        cognome: 'Neri',
        data_nascita: '1995-12-15',
        luogo_nascita: {
          comune: 'Firenze',
          provincia: 'FI',
          stato: 'Italia',
        },
        sesso: 'F',
        cittadinanza: 'Italiana',
      },
      residenza: {
        indirizzo: 'Piazza della Signoria',
        civico: 8,
        cap: '50122',
        comune_residenza: 'Firenze',
        provincia_residenza: 'FI',
        stato_residenza: 'Italia',
      },
      contatti: {
        telefono: '+390552345678',
        email: 'francesca.neri@example.com',
        pec: 'francesca.neri@pec.example.com',
      },
      documenti_identita: [
        {
          tipo_documento: "Carta d'Identità",
          numero_documento: 'FI1239874',
          data_emissione: '2021-04-20',
          data_scadenza: '2031-04-20',
          ente_emittente: 'Comune di Firenze',
        },
      ],
      altri_dettagli: {
        stato_civile: 'Single',
        data_ultimo_aggiornamento: '2024-08-10',
      },
    },

    {
      cittadino: {
        id: '9988776655',
        codice_fiscale: 'CNTMRZ88B10E100V',
        nome: 'Martina',
        cognome: 'Conti',
        data_nascita: '1988-02-10',
        luogo_nascita: {
          comune: 'Bologna',
          provincia: 'BO',
          stato: 'Italia',
        },
        sesso: 'F',
        cittadinanza: 'Italiana',
      },
      residenza: {
        indirizzo: "Via dell'Indipendenza",
        civico: 78,
        cap: '40121',
        comune_residenza: 'Bologna',
        provincia_residenza: 'BO',
        stato_residenza: 'Italia',
      },
      contatti: {
        telefono: '+390512345678',
        email: 'martina.conti@example.com',
        pec: 'martina.conti@pec.example.com',
      },
      documenti_identita: [
        {
          tipo_documento: 'Passaporto',
          numero_documento: 'CB1122334',
          data_emissione: '2019-11-01',
          data_scadenza: '2029-11-01',
          ente_emittente: 'Questura di Bologna',
        },
      ],
      altri_dettagli: {
        stato_civile: 'Divorziato',
        data_ultimo_aggiornamento: '2024-09-25',
      },
    },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(
      'Activated route data in Component: ',
      this.activatedRoute.data
    );

    // this.getAnagrafica();
    console.log(this.anagrafica);
  }

  getAnagrafica() {
    this.activatedRoute.data.subscribe((response: any) => {
      console.log('Anagrafica Fetching', response);
      this.anagrafica = response.anagrafica;
      console.log('Anagrafica Fetched');
    });
  }
}
