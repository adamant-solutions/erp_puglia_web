export interface VoceSpesaDTO {
periodoId: number;
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
    periodoId?: string;
  }