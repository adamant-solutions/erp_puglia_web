
export interface RegistrazioneContabile {
    id: number
    dataRegistrazione: string
    dataCompetenza: string
    numeroProtocollo: string
    tipo: string
    descrizione: string
    contrattoId: number
    movimenti: Movimenti[]
    version: number
  }
  
  export interface Movimenti {
    id?: number
    importo: number
    dare: boolean
    contoId: number
    version?: number
  }
  
  
  export enum TipoRegistrazione {
    DA_CONTRATTO = 'DA_CONTRATTO', // Registrazioni generate dai contratti
    DA_INCASSO = 'DA_INCASSO',// Registrazioni di incasso
    STORNO = "STORNO",// Storni e rettifiche
    MANUALE = "MANUALE"  // Registrazioni manuali
  }
