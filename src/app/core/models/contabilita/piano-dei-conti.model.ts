
export interface PianoDeiConti {

  id: number
  codice: string
  descrizione: string
  tipo: TipoConto;
  parentId?: number
  children: Children[]
  version: number
  leaf: boolean
  parentCodice?: string //to display parent codice
}

export interface Children {
  id: number
  codice: string
  descrizione: string
  tipo: string
  parentId: number
  children: Children2[]
  version: number
  leaf: boolean
}

export interface Children2 {
  id: number
  codice: string
  descrizione: string
  tipo: string
  parentId: number
  children: any[]
  version: number
  leaf: boolean
}

export enum TipoConto {
  ATTIVITA = "ATTIVITA",    // Beni, crediti, liquidità
  PASSIVITA = "PASSIVITA",   // Debiti, fondi
  COSTI = "COSTI",       // Spese, perdite
  RICAVI = "RICAVI",      // Entrate, guadagni
  PATRIMONIO = "PATRIMONIO"   // Capitale, riserve
}
