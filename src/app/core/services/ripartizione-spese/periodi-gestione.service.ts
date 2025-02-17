import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodiGestione } from '../../models/periodi-gestione.model';
import { CondominioLight } from '../../models/condominio-light.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodoGestioneService {
  constructor(
    private http: HttpClient,
    @Inject('periodiGestioniUrl') private periodiGestioniUrl: string,
    @Inject('condominiLightUrl') private condominiLightUrl: string
  ) {}

  getAllPeriodi(): Observable<any> {
    return this.http.get<PeriodiGestione[]>(this.periodiGestioniUrl, { 
      observe: 'response' 
    });
  }

  getPeriodi(
    pagina: number, 
    size: number, 
    dataInizio?: string, 
    dataFine?: string, 
    stato?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('size', size.toString());

    if (dataInizio) params = params.set('dataInizio', dataInizio);
    if (dataFine) params = params.set('dataFine', dataFine);
    if (stato) params = params.set('stato', stato);

    return this.http.get<PeriodiGestione[]>(this.periodiGestioniUrl, {
      params,
      observe: 'response'
    });
  }

  getPeriodoById(id: number): Observable<PeriodiGestione> {
    return this.http.get<PeriodiGestione>(`${this.periodiGestioniUrl}/${id}`);
  }
  

avanzaStato(periodoId: number): Observable<PeriodiGestione> {
  return this.http.put<PeriodiGestione>(`${this.periodiGestioniUrl}/${periodoId}/avanza-stato`, {});
}

  createPeriodo(periodo: PeriodiGestione): Observable<PeriodiGestione> {
    return this.http.post<PeriodiGestione>(this.periodiGestioniUrl, periodo);
  }

  updatePeriodo(id: number, periodo: PeriodiGestione): Observable<PeriodiGestione> {
    return this.http.put<PeriodiGestione>(`${this.periodiGestioniUrl}`, periodo);
  }

  deletePeriodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.periodiGestioniUrl}/${id}`);
  }

  getPeriodoByCondominioId(condominioId: number): Observable<PeriodiGestione[]> {
    return this.http.get<PeriodiGestione[]>(`${this.periodiGestioniUrl}/condominio/${condominioId}`);
  }


  getPeriodoAttivo(condominioId: number): Observable<PeriodiGestione> {
    return this.http.get<PeriodiGestione>(`${this.periodiGestioniUrl}/condominio/${condominioId}/attivo`);
  }

  chiudiPeriodo(id: number): Observable<PeriodiGestione> {
    return this.http.put<PeriodiGestione>(`${this.periodiGestioniUrl}/${id}/chiudi`, {});
  }

  riaprePeriodo(id: number): Observable<PeriodiGestione> {
    return this.http.put<PeriodiGestione>(`${this.periodiGestioniUrl}/${id}/riapri`, {});
  }

  getAllCondominiLight(): Observable<CondominioLight[]> {
    return this.http.get<CondominioLight[]>(this.condominiLightUrl);
  }
}