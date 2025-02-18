export interface PeriodiGestione {
    id: number
    dataInizio: string
    dataFine: string
    stato: string
    condominioId: number
    note: string
    version: number
  }
  
  export interface PeriodoLight {
    id: number;
    anno: number;
    descrizione: string;
  }