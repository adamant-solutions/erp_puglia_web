export interface Morosita {
    id: number
    contrattoId: number
    dataRilevazione: string
    dataScadenza: string
    importoDovuto: number
    importoVersato: number
    importoMorosita: number
    stato: string
    note: string
    tentativiContatto: number
    modalitaContatto: string
    esitoContatto: string
  }
  
  export interface MorositaSearchParams {
    contrattoId?: string;
    stato?: string;
    importoMinimo?: string;
    importoMassimo?: string;
  }