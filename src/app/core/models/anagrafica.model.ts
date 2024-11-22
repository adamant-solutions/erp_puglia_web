export interface LuogoNascita {
  comune: string;
  provincia: string;
  stato: string;
}

export interface Cittadino {
  id: number;
  createDate: Date | string;
  lastUpdateDate: Date | string;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  genere: string;
  cittadinanza: string;
  dataDiNascita: Date | string;
  luogo_nascita: LuogoNascita;
}

export interface Residenza {
  indirizzo: string;
  civico: number; // string ?
  cap: string;
  comune_residenza: string;
  provincia_residenza: string;
  stato_residenza: string;
}

export interface Contatti {
  telefono: string;
  email: string;
  pec: string;
}

export interface DocumentiIdentita {
  tipo_documento: string;
  numero_documento: string;
  data_emissione: Date | string;
  data_scadenza: Date | string;
  ente_emittente: string;
}

export interface AltriDettagli {
  stato_civile: string;
  data_ultimo_aggiornamento: Date | string;
}

export interface Anagrafica {
  id: number;
  createDate: Date | string;
  lastUpdateDate: Date | string;

  cittadino: Cittadino;
  residenza: Residenza;
  contatti: Contatti;
  documenti_identita: DocumentiIdentita[];
  altri_dettagli: AltriDettagli;
}
