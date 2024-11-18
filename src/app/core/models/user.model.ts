export interface User {
  id: number;
  nome: string;
  cognome: string;
  codice_fiscale: string;
  role?: Role | string;
}
export enum Role {
  test = 'Test',
}
