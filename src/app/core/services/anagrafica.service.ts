import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';
import { AnagraficaSearchParams } from '../resolvers/anagrafica.resolver';

@Injectable({
  providedIn: 'root',
})
export class AnagraficaService {

  constructor(
  
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    private http: HttpClient
  ) {}


  getAnagrafica(pageNumber: number): Observable<Anagrafica[]> {
    return this.http.get<Anagrafica[]>(`${this.anagraficaUrl}?pagina=${pageNumber}`).pipe(
      catchError(this.handleError)
    );
  }
  
  getFilteredAnagrafica(params: AnagraficaSearchParams) {
    let httpParams = new HttpParams().set('pagina', (params.pagina || 0).toString())

    if (params.codiceFiscale) {
      httpParams = httpParams.set('codiceFiscale', params.codiceFiscale);
    }
    if (params.nome) {
      httpParams = httpParams.set('nome', params.nome);
    }
    if (params.cognome) {
      httpParams = httpParams.set('cognome', params.cognome);
    }

    return this.http.get<Anagrafica[]>(`${this.anagraficaUrl}`, { params: httpParams, observe: 'response' }).pipe(
      catchError(this.handleError)
    );

  }


  getAnagraficaById(id: number): Observable<Anagrafica> {
    return this.http.get<Anagrafica>(`${this.anagraficaUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  addAnagrafica(formData: FormData): Observable<Anagrafica> {
    return this.http.post<Anagrafica>(`${this.anagraficaUrl}`, formData).pipe(
      catchError(this.handleError)
    );
  }


  modificaAnagrafica(anagrafica: Anagrafica, documenti?: File): Observable<Anagrafica> {
    const formData = new FormData();
    formData.append('anagrafica', new Blob([JSON.stringify(anagrafica)], { type: 'application/json' }), 'anagrafica.json');

    if (documenti) {
      formData.append('documenti', documenti, documenti.name);
    }

    return this.http.put<Anagrafica>(`${this.anagraficaUrl}`, formData).pipe(
      catchError(this.handleError)
    );
  }


  downloadDocument(anagraficaId: number, documentoId: number): Observable<Blob> {
    return this.http.get(`${this.anagraficaUrl}/${anagraficaId}/documenti/${documentoId}/download`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      map(response => {
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        return new Blob([response.body as BlobPart], { type: contentType });
      }),
      catchError(this.handleError)
    );
  }

  deleteAnagrafica(id: number): Observable<any> {
    return this.http.delete(`${this.anagraficaUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  deleteDocument(anagraficaId: number, documentoId: number): Observable<any> {
    return this.http.delete(`${this.anagraficaUrl}/${anagraficaId}/documenti/${documentoId}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}