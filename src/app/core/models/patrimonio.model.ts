export interface Patrimonio {
  id: number;

  metriQuadri: number; // Float
  quartiere: string; // Required
  tipoAmministrazione: TipoAmministrazione; // Enum, Required
  statoDisponibilita: StatoDisponibilita; // Enum, Required
  comune: string; // Required
  provincia: string; // Required, 2 char
  indirizzo: string; // Required
  sezioneUrbana: string; // Required, max 3 char
  foglio: string; // Required, max 4 char
  particella: string; // Required, max 5 char
  categoriaCatastale: string; // Required, max 3 char
  classeCatastale: string; // Required, max 2 char
  renditaCatastale: number; // Required, Float
  consistenzaCatastale: number; // Required, Float
  zona?: string; // Optional string
  classeEnergetica?: string; // Optional string
  descrizione?: string; // Optional string
  civico?: string; // Optional string
  subalterno?: string; // Optional string
  piano?: string; // Optional string
  documenti: Documento[]; // Array of documents
}

export interface Documento {
  id: number;

  tipoDocumento: TipoDocumento; // Required
  dataDocumento: string; // Required, ISO date string (yyyy-MM-dd)
  percorsoFile: string; // Required, example: "/documenti/catasto/doc123.pdf"
  descrizione?: string; // Optional string
}

export enum TipoAmministrazione {
  DIRETTA = 'DIRETTA', // String
  INDIRETTA = 'INDIRETTA', // String
  // Add other possible values here
}

export enum StatoDisponibilita {
  DISPONIBILE = 'DISPONIBILE', // String
  NON_DISPONIBILE = 'NON DISPONIBILE', // String
  // Add other possible values here
}

export enum TipoDocumento {
  CATASTALE = 'CATASTALE',
  // Add other possible values here
}
