import {
  Contatti,
  DocumentiIdentita,
  LuogoNascita,
  Residenza,
} from './anagrafica.model';

/**
 * Rappresentazione del contratto di locazione esposta dal backend dopo lo split
 * del bounded context. Allineata a {@code it.erppuglia.contratti.api.dto.ContrattoLocazioneDTO}.
 * I campi legacy (residenza/contatti sull'intestatario, unitaImmobiliare annidata)
 * non sono piu' forniti: chi ne ha bisogno deve chiamare anagrafica-service
 * o patrimonio-service esplicitamente.
 */
export interface Contratti {
  id: number;
  dataInizio: string;
  dataFine: string;
  canoneMensile: number;
  statoContratto: StatoContratto;
  descrizione: string;
  unitaImmobiliareId?: number;
  indirizzoUnitaImmobiliare?: string;
  intestatari?: Intestatari[];
  documenti?: DocumentoContrattoLight[];

  /** @deprecated non piu' popolato dal backend: usare unitaImmobiliareId. */
  unitaImmobiliare?: { id: number } | number;
  /** @deprecated usare intestatari e filtrare per dataFine == null. */
  intestatariAttuali?: Intestatari[];
  /** @deprecated usare intestatari e filtrare per dataFine != null. */
  intestatariStorici?: Intestatari[];
  createDate?: string;
  lastUpdateDate?: string;
}

export type StatoContratto = 'ATTIVO' | 'SCADUTO' | 'DISDETTO' | 'ANNULLATO';

/**
 * Allineata a {@code ContrattoIntestatarioDTO}: contiene ID anagrafica e
 * nome/cognome denormalizzati lato backend via Feign verso anagrafica-service.
 */
export interface Intestatari {
  id: number;
  intestatarioId: number;
  nomeIntestatario?: string;
  cognomeIntestatario?: string;
  dataInizio: string;
  dataFine?: string | null;
  motivoFine?: string | null;

  /** @deprecated alias legacy di intestatarioId usato dai form add/edit. */
  intestatario?: number;
}

/**
 * Allineata a {@code DocumentoContrattoLightDTO}: metadati del documento per
 * elenco/download, senza payload binario.
 */
export interface DocumentoContrattoLight {
  id: number;
  nomeFile: string;
  contentType?: string;
}

/** @deprecated il DTO pubblico non espone piu' il cittadino annidato. */
export interface IntestatariAttuali {
  id: number;
  cittadino: Cittadino;
}

/** @deprecated il DTO pubblico non espone piu' il cittadino annidato. */
export interface Cittadino {
  id: number;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  genere: string;
  cittadinanza: string;
  dataDiNascita: string;
  residenza?: Residenza;
  contatti?: Contatti;
  luogo_nascita?: LuogoNascita;
  documenti_identita?: DocumentiIdentita[];
}

export interface ModelLight {
  id: number;
  descrizione: string;
}
