export interface PeriodiGestione {
  id: number;
  indirizzoCondominio?: string;
  comuneCondominio?: string;
  provinciaCondominio?: string;
  dataInizio: string;
  dataFine: string;
  stato: string;
  condominioId: number;
  note: string;
  version: number;
}

export interface PeriodoLight {
  id: number;
  anno: number;
  descrizione: string;
}
