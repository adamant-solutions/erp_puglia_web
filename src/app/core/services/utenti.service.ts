import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Utente {
  id?: number;
  username: string;
  nome?: string;
  cognome?: string;
  email?: string;
  attivo?: boolean;
  ruoli?: string[];
}

export interface UtenteCreate extends Utente {
  password: string;
}

export interface UtenteUpdate {
  nome?: string;
  cognome?: string;
  email?: string;
  attivo?: boolean;
  password?: string;
  ruoli?: string[];
}

export interface Ruolo {
  id: number;
  nome: string;
  descrizione: string;
}

@Injectable({ providedIn: 'root' })
export class UtentiService {
  constructor(
    private http: HttpClient,
    @Inject('utentiUrl') private base: string
  ) {}

  list(): Observable<Utente[]> { return this.http.get<Utente[]>(this.base); }
  get(id: number): Observable<Utente> { return this.http.get<Utente>(`${this.base}/${id}`); }
  create(u: UtenteCreate): Observable<Utente> { return this.http.post<Utente>(this.base, u); }
  update(id: number, u: UtenteUpdate): Observable<Utente> { return this.http.put<Utente>(`${this.base}/${id}`, u); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
  ruoli(): Observable<Ruolo[]> { return this.http.get<Ruolo[]>(`${this.base}/ruoli`); }
}
