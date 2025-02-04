export interface Imprese {
    id: number
    ragioneSociale: string
    partitaIva: string
    codiceFiscale: string
    indirizzo: string
    citta: string
    provincia: string
    cap: string
    telefono: string
    email: string
    pec: string
}

export interface Piani {
    id: number
    anno: number
    descrizione: string
    budgetTotale: number
    budgetUtilizzato: number
    budgetResiduo: number
    dataApprovazione?: string
    note: string
}

export interface Appaltio {
    id: number
    codiceCIG: string
    codiceCUP: string
    oggetto: string
    tipoAppalto: string
    stato: string
    importoBaseAsta: number
    importoAggiudicazione: any
    dataPubblicazione: string
    dataScadenza: string
    dataAggiudicazione?: string
    impresaAggiudicatariaId?: number
}

export interface Interventi {
    id: number
    richiestaId: number
    dataInizio: string
    dataFine: string
    dataIntervento: string
    descrizione: string
    materialiUtilizzati: any
    oreLavoro: any
    costoMateriali: any
    costoManodopera: any
    noteTecniche: any
    esitoIntervento: any
    impresaId: any
    personaleCoinvolto: any
    garanziaFino: any
    stato: string
}


export enum OrigineRichiesta {
    PIANO_MANUTENZIONE,    // Richiesta originata dal piano
    SEGNALAZIONE,          // Richiesta da inquilino/utente
    EMERGENZA,             // Richiesta urgente non pianificata
    ISPEZIONE              // Richiesta da controllo tecnico

}



export enum PrioritaIntervento {
    EMERGENZA,      // Intervento immediato necessario
    ALTA,           // Priorità elevata
    MEDIA,          // Priorità normale
    BASSA           // Può essere pianificato nel lungo termine

}



export enum StatoAppalto {
    IN_PROGRAMMAZIONE,    // Fase iniziale di pianificazione
    IN_PROGETTAZIONE,     // Fase di progettazione tecnica
    BANDO_IN_CORSO,       // Pubblicazione e gestione del bando
    VALUTAZIONE_OFFERTE,  // Analisi delle offerte ricevute
    AGGIUDICATO,          // Appalto assegnato
    IN_ESECUZIONE,        // Lavori in corso
    SOSPESO,              // Lavori temporaneamente sospesi
    COLLAUDATO,           // Collaudo tecnico completato
    CHIUSO,               // Procedura completata
    ANNULLATO             // Procedura annullata
}



export enum StatoIntervento {
    PROGRAMMATO,  // Intervento pianificato
    IN_CORSO,     // Intervento in esecuzione
    COMPLETATO,   // Intervento completato
    ANNULLATO     // Intervento annullato
}



export enum StatoRichiesta {
    RICEVUTA,     // Fase iniziale - ricezione richiesta
    IN_VERIFICA,  // Fase di verifica preliminare
    APPROVATA,    // Verifica completata positivamente
    PIANIFICATA,  // Inserita nel piano di interventi
    IN_ESECUZIONE,// Lavori in corso
    COMPLETATA,   // Lavori terminati
    IN_COLLAUDO,  // Fase di controllo finale
    CHIUSA,       // Processo completato
    RIFIUTATA     // Richiesta non approvata

}



export enum TipoAppalto {

    LAVORI,   // Appalto per lavori
    SERVIZI,  // Appalto per servizi
    FORNITURE // Appalto per forniture

}



export enum TipoManutenzione {

    ORDINARIA,      // Interventi di routine e piccole riparazioni
    STRAORDINARIA   // Interventi strutturali o di grande entità

}

