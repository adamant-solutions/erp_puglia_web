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
    anno: string
    descrizione: string
    budgetTotale: number | string
    budgetUtilizzato: number | string
    budgetResiduo: number | string
    dataApprovazione?: string
    note: string
}

export interface Appalto {
    id: number
    pianoId?: number
    codiceCIG: string
    codiceCUP: string
    oggetto: string
    tipoAppalto: string
    stato: string
    importo?: number
    importoBaseAsta: number
    importoAggiudicazione: any
    dataPubblicazione: string
    dataScadenza: string
    dataAggiudicazione: string
    impresaAggiudicatariaId: number
    note?: string
}

export interface Richiesta {
    id: number
    unitaImmobiliareId: number
    richiedenteId: number
    dataRichiesta: string
    descrizione: string
    tipoManutenzione: string
    stato: string
    priorita: string
    noteVerifica: string
    dataApprovazione: string
    dataPianificazione: string
    dataInizioLavori: string
    dataFineLavori: string
    esitoCollaudo: string
    pianoId: number
    appaltoId: number
    richiestaId: number
    origineRichiesta: string
    budgetStimato: number
    budgetEffettivo: number
    periodoPianificato: string
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
    PIANO_MANUTENZIONE = "PIANO_MANUTENZIONE",    // Richiesta originata dal piano
    SEGNALAZIONE = "SEGNALAZIONE",          // Richiesta da inquilino/utente
    EMERGENZA = "EMERGENZA",             // Richiesta urgente non pianificata
    ISPEZIONE =  "ISPEZIONE"           // Richiesta da controllo tecnico

}



export enum PrioritaIntervento {
    EMERGENZA = "EMERGENZA",      // Intervento immediato necessario
    ALTA= "ALTA",           // Priorità elevata
    MEDIA= "MEDIA",          // Priorità normale
    BASSA = "BASSA"          // Può essere pianificato nel lungo termine

}



export enum StatoAppalto {
    IN_PROGRAMMAZIONE = "IN_PROGRAMMAZIONE",    // Fase iniziale di pianificazione
    IN_PROGETTAZIONE = "IN_PROGETTAZIONE",     // Fase di progettazione tecnica
    BANDO_IN_CORSO = "BANDO_IN_CORSO",       // Pubblicazione e gestione del bando
    VALUTAZIONE_OFFERTE = "VALUTAZIONE_OFFERTE",  // Analisi delle offerte ricevute
    AGGIUDICATO = "AGGIUDICATO",          // Appalto assegnato
    IN_ESECUZIONE = "IN_ESECUZIONE",        // Lavori in corso
    SOSPESO = "SOSPESO",              // Lavori temporaneamente sospesi
    COLLAUDATO = "COLLAUDATO",           // Collaudo tecnico completato
    CHIUSO = "CHIUSO",               // Procedura completata
    ANNULLATO = "ANNULLATO"            // Procedura annullata
}



export enum StatoIntervento {
    PROGRAMMATO = "PROGRAMMATO",  // Intervento pianificato
    IN_CORSO = "IN_CORSO",     // Intervento in esecuzione
    COMPLETATO = "COMPLETATO",   // Intervento completato
    ANNULLATO  = "ANNULLATO"  // Intervento annullato
}



export enum StatoRichiesta {
    RICEVUTA= "RICEVUTA",     // Fase iniziale - ricezione richiesta
    IN_VERIFICA= "IN_VERIFICA",  // Fase di verifica preliminare
    APPROVATA= "APPROVATA",    // Verifica completata positivamente
    PIANIFICATA= "PIANIFICATA",  // Inserita nel piano di interventi
    IN_ESECUZIONE= "IN_ESECUZIONE",// Lavori in corso
    COMPLETATA= "COMPLETATA",   // Lavori terminati
    IN_COLLAUDO= "IN_COLLAUDO",  // Fase di controllo finale
    CHIUSA= "CHIUSA",       // Processo completato
    RIFIUTATA  = "RIFIUTATA"   // Richiesta non approvata

}



export enum TipoAppalto {

    LAVORI= "LAVORI",   // Appalto per lavori
    SERVIZI= "SERVIZI",  // Appalto per servizi
    FORNITURE= "FORNITURE" // Appalto per forniture

}



export enum TipoManutenzione {

    ORDINARIA= "ORDINARIA",      // Interventi di routine e piccole riparazioni
    STRAORDINARIA= "STRAORDINARIA"   // Interventi strutturali o di grande entità

}

