export interface Residenza {
  id: number;
  createDate: string;
  lastUpdateDate: string;

  indirizzo: string;
  civico: string;
  cap: string;
  comuneResidenza: string;
  provinciaResidenza: string;
  statoResidenza: string;
}

export interface Contatti {
  id: number;
  createDate: string;
  lastUpdateDate: string;

  telefono: string;
  cellulare: string;
  email: string;
  pec: string;
}

export interface LuogoNascita {
  comune: string;
  provincia: string;
  stato: string;
}

export interface DocumentiIdentita {
  id: number;
  createDate: string;
  lastUpdateDate: string;
nomeFile: string;
contentType: string;
  tipo_documento: TipoDocumento[];
  numero_documento: string;
  data_emissione: string;
  data_scadenza: string;
  ente_emittente: string;
}

export enum TipoDocumento {
  CARTA_DEL_IDENTITA = "Carta d'Identità",
  PASSAPORTO = 'Passaporto',
  PATENTE = 'Patente',
}

export interface Cittadino {
  id: number;
  createDate: string;
  lastUpdateDate: string;

  nome: string;
  cognome: string;
  codiceFiscale: string;
  genere: string;
  cittadinanza: string;
  dataDiNascita: string;

  residenza: Residenza;
  contatti: Contatti;
  luogo_nascita: LuogoNascita;
  documenti_identita: DocumentiIdentita[];
}

export interface AltriDettagli {
  stato_civile: string;
  data_ultimo_aggiornamento: string;
}

export interface Anagrafica {
  id: number;
  createDate: string;
  lastUpdateDate: string;

  cittadino: Cittadino;

  altri_dettagli: AltriDettagli;
}
