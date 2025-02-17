export interface VoceSpesaDTO {
    id: number;
    tipoSpesa: 'SERVIZI' | 'RISCALDAMENTO' | 'ASCENSORE';
    descrizione: string;
    importoPreventivo: number;
    importoConsuntivo?: number;
    importoConguaglio?: number;
    note?: string;
    version: number;
  }

export interface PageableResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }


  export interface VoceSpesaSearchParams {
    descrizione?: string;
    tipoSpesa?: string;
    importoMinPreventivo?: number;
    importoMaxPreventivo?: number;
    importoMinConsuntivo?: number;
    importoMaxConsuntivo?: number;
    note?: string;
    periodoId?: number;
  }