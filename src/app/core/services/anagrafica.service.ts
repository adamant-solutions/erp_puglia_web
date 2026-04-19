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
    return this.http.get<any[]>(`${this.anagraficaUrl}?pagina=${pageNumber}`).pipe(
      map((list) => (list || []).map((a) => this.normalizeAnagrafica(a))),
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

    return this.http.get<any[]>(`${this.anagraficaUrl}`, { params: httpParams, observe: 'response' }).pipe(
      map((response) => response.clone({
        body: (response.body || []).map((a) => this.normalizeAnagrafica(a)) as any,
      })),
      catchError(this.handleError)
    );

  }


  getAnagraficaById(id: number): Observable<Anagrafica> {
    return this.http.get<any>(`${this.anagraficaUrl}/${id}`).pipe(
      map((a) => this.normalizeAnagrafica(a)),
      catchError(this.handleError)
    );
  }

  private normalizeAnagrafica(raw: any): Anagrafica {
    if (!raw) return raw;
    const cittadino = raw.cittadino;
    if (cittadino) {
      const cfSnake = cittadino.codice_fiscale;
      const cfCamel = cittadino.codiceFiscale;
      if (cfSnake != null && cfSnake !== '' && (cfCamel == null || cfCamel === '')) {
        cittadino.codiceFiscale = cfSnake;
      }
      const dataSnake = cittadino.data_nascita;
      const dataCamel = cittadino.dataDiNascita;
      if (dataSnake != null && dataSnake !== '' && (dataCamel == null || dataCamel === '')) {
        cittadino.dataDiNascita = dataSnake;
      }
      const docs = cittadino.documenti_identita;
      if (Array.isArray(docs)) {
        docs.forEach((doc: any) => {
          if (doc.nomeFile === undefined && doc.nome_file !== undefined) {
            doc.nomeFile = doc.nome_file;
          }
          if (doc.contentType === undefined && doc.content_type !== undefined) {
            doc.contentType = doc.content_type;
          }
        });
      }
      this.mergeSnakeNested(cittadino.residenza, [
        ['comuneResidenza', 'comune_residenza'],
        ['provinciaResidenza', 'provincia_residenza'],
        ['statoResidenza', 'stato_residenza'],
      ]);
    }
    return raw as Anagrafica;
  }

  /** Copia da chiave snake solo se il camel è assente o stringa vuota. */
  private mergeSnakeNested(obj: any, pairs: [string, string][]): void {
    if (!obj || typeof obj !== 'object') return;
    for (const [camel, snake] of pairs) {
      if (snake === camel) continue;
      const s = obj[snake];
      const c = obj[camel];
      if (s != null && s !== '' && (c == null || c === '')) {
        obj[camel] = s;
      }
    }
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