import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface StatoPagamenti {
  indirizzo: string
  civico?: string
  comune: string
  provincia: string
  periodi: Periodi[]
}

export interface Periodi {
  periodoId: number
  dataInizio: string
  dataFine: string
  stato: string
  voci: Voci[]
  totaleQuote: number
  totalePagato: number
  percentualePagamento: string
}

export interface Voci {
  voceSpesaId: number
  descrizione: string
  importoQuota: number
  millesimi: number
  pagato: boolean
  stato: string
}


@Injectable({
  providedIn: 'root'
})
export class StatoPagamentiService {

  constructor(private http: HttpClient,
    @Inject('statoPagamentiUrl') private url:string
 ) {}

 getAllStatoPagamenti(): Observable<any> {
   return this.http.get<StatoPagamenti[]>(this.url, { 
     observe: 'response' 
   });
 }
 
}