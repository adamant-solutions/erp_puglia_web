export interface SituazioneCrediti {
    // Contract details
    intestatario: string;       // Full name of the contract holder
    indirizzo: string;          // Street and house number
    comune: string;             // City of the property
    provincia: string;          // Province of the property
    dataCompetenza: string;     // LocalDate → string (ISO format)
    descrizione: string;      
    importoCanone: number;      
    importoIncassato: number;   
    saldoCredito: number;      
    stato: string;              // Payment status: "PAGATO", "NON PAGATO", "PARZIALE"
  }
