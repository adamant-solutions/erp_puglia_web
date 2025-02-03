import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contratti, ModelLight } from '../models/contratto.model';
import { ContrattiSearchParams } from '../resolvers/contratti.resolver';

@Injectable({
  providedIn: 'root'
})
export class ContrattiService {
  constructor(
    @Inject('contrattiUrl') private contrattiUrl: string,
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    @Inject('patrimonioUrl') private patrimonioUrl: string,
    private http: HttpClient
  ) {}

  getContratti(pageNumber: number): Observable<Contratti[]> {
    return this.http.get<Contratti[]>(`${this.contrattiUrl}?pagina=${pageNumber}`);
  }

  getFilteredContratti(searchParams: ContrattiSearchParams): Observable<HttpResponse<Contratti[]>> {
    const params = new HttpParams({
      fromObject: {
        pagina: searchParams.pagina?.toString() ?? '',
        indirizzo: searchParams.indirizzo ?? '',
        canoneMensileMin: searchParams.canoneMensileMin?.toString() ?? '',
        canoneMensileMax: searchParams.canoneMensileMax?.toString() ?? '',
        dataInizioFrom: searchParams.dataInizioFrom ?? '',
        dataInizioTo: searchParams.dataInizioTo ?? '',
        dataFineTo: searchParams.dataFineTo ?? ''
      }
    });

    return this.http.get<Contratti[]>(this.contrattiUrl, { params, observe: 'response' });
  }

  getContrattiById(id: number): Observable<Contratti> {
    return this.http.get<Contratti>(`${this.contrattiUrl}/${id}`);
  }

  getUnitaImmobiliare(): Observable<HttpResponse<ModelLight>> {
    return this.http.get<ModelLight>(`${this.patrimonioUrl}/light`, { observe: 'response' });
  }

  getIntestatari(): Observable<HttpResponse<ModelLight>> {
    return this.http.get<ModelLight>(`${this.anagraficaUrl}/light`, { observe: 'response' });
  }

  terminaContratto(id: number, motivoFine: string): Observable<void> {
    const params = new HttpParams().set('motivoFine', motivoFine);
    
    return this.http.put<void>(`${this.contrattiUrl}/${id}/termina`, null, { params });
  }
  
  updateStato(id: number, statoContratto: string): Observable<Contratti> {
    return this.http.patch<Contratti>(
      `${this.contrattiUrl}/${id}/stato`, 
      JSON.stringify(statoContratto), 
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  uploadDocument(contrattoId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.contrattiUrl}/contratti/${contrattoId}/documenti`, formData);
  }

  addContratto(contrattoData: FormData): Observable<Contratti> {
    return this.http.post<Contratti>(
      this.contrattiUrl, 
      contrattoData,
      {
        headers: { 'Accept': 'application/json' }
      }
    );
  }
}