
export interface Contabilita {

  id: number
  codice: string
  descrizione: string
  tipo: string
  parentId?: number
  children: Children[]
  version: number
  leaf: boolean
  parentCodice: string //to display parent codice
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
