import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrazioneContabile, TipoRegistrazione } from '../../models/contabilita/registrazione-contabile.model';
import { SituazioneCrediti } from '../../models/contabilita/situazione-crediti.model';


@Injectable({
  providedIn: 'root'
})
export class RegistrazioneContabileService {

  constructor(private http: HttpClient, @Inject('contabilitaUrl') private apiUrl: string,) {}

  create(registrazione: RegistrazioneContabile): Observable<RegistrazioneContabile> {
    return this.http.post<RegistrazioneContabile>(`${this.apiUrl}/registrazioni`, registrazione);
  }

  update(id: number, registrazione: RegistrazioneContabile): Observable<RegistrazioneContabile> {
    return this.http.put<RegistrazioneContabile>(`${this.apiUrl}/registrazioni/${id}`, registrazione);
  }

  findById(id: number): Observable<RegistrazioneContabile> {
    return this.http.get<RegistrazioneContabile>(`${this.apiUrl}/registrazioni/${id}`);
  }

  findByContratto(contrattoId: number): Observable<RegistrazioneContabile[]> {
    return this.http.get<RegistrazioneContabile[]>(`${this.apiUrl}/registrazioni/contratto/${contrattoId}`);
  }

  findByPeriodo(dataInizio: Date, dataFine: Date, tipo?: TipoRegistrazione): Observable<RegistrazioneContabile[]> {
    let params = new HttpParams()
      .set('dataInizio', formatDate(dataInizio, 'yyyy-MM-dd', 'en-US'))
      .set('dataFine', formatDate(dataFine, 'yyyy-MM-dd', 'en-US'));
    
    if (tipo) {
      params = params.set('tipo', tipo);
    }
    
    return this.http.get<RegistrazioneContabile[]>(`${this.apiUrl}/registrazioni/periodo`, { params });
  }

  findAll(): Observable<RegistrazioneContabile[]> {
    return this.http.get<RegistrazioneContabile[]>(`${this.apiUrl}/registrazioni`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/registrazioni/${id}`);
  }

  getSituazioneCrediti(contrattoId: number): Observable<SituazioneCrediti[]> {
    return this.http.get<SituazioneCrediti[]>(`${this.apiUrl}/registrazioni/contratto/${contrattoId}/situazione-crediti`);
  }

  save(registrazione: RegistrazioneContabile): Observable<RegistrazioneContabile> {
    if (registrazione.id) {
      return this.update(registrazione.id, registrazione);
    } else {
      return this.create(registrazione);
    }
  }
}
