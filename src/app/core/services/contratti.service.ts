import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError, map } from 'rxjs';
import { Contratti, ModelLight } from '../models/contratto.model';
import { ContrattiSearchParams } from '../resolvers/contratti.resolver';

@Injectable({
  providedIn: 'root'
})
export class ContrattiService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(
    @Inject('tokenUrl') private tokenUrl: string,
    @Inject('contrattiUrl') private contrattiUrl: string,
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    @Inject('patrimonioUrl') private patrimonioUrl: string,
    private http: HttpClient
  ) {}

  private getToken(scope: 'erp:read' | 'erp:write'): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: scope === 'erp:read'
        ? 'Basic cmVhZGVyOnNlY3JldC1yZWFkZXI='
        : 'Basic d3JpdGVyOnNlY3JldC13cml0ZXI=',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `grant_type=client_credentials&scope=${scope}`;

    return this.http.post<{ access_token: string; expires_in: number }>(
      this.tokenUrl,
      body,
      { headers }
    ).pipe(
      switchMap(response => {
        this.token = response.access_token;
        this.tokenExpiry = Date.now() + (response.expires_in * 1000) - 5000;
        return of(this.token);
      }),
      catchError(error => {
        console.error('Token fetch failed:', error);
        return throwError(() => new Error('Failed to fetch authentication token'));
      })
    );
  }

  private getHeaders(): HttpHeaders {
    if (!this.token) {
      throw new Error('Token not available');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  private isTokenExpired(): boolean {
    return !this.token || !this.tokenExpiry || Date.now() >= this.tokenExpiry;
  }

  private secureApiCall<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body: any = null,
    options: any = {},
    scope: 'erp:read' | 'erp:write' = 'erp:read'
  ): Observable<T> {
    if (this.isTokenExpired()) {
      return this.getToken(scope).pipe(
        switchMap(() => this.makeApiCall<T>(method, url, body, options)),
        catchError(error => {
          console.error('API call failed:', error);
          return throwError(() => error);
        })
      );
    }
    return this.makeApiCall<T>(method, url, body, options);
  }

  private makeApiCall<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body: any = null,
    options: any = {}
  ): Observable<T> {
    const headers = this.getHeaders();
    const requestOptions = { ...options, headers };
    
   
    const needsFullResponse = options.observe === 'response';
    const baseOptions = needsFullResponse ? requestOptions : { ...requestOptions, observe: 'body' };

    switch (method) {
      case 'GET':
        return this.http.get(url, baseOptions) as Observable<T>;
      case 'POST':
        return this.http.post(url, body, baseOptions) as Observable<T>;
      case 'PUT':
        return this.http.put(url, body, baseOptions) as Observable<T>;
      case 'DELETE':
        return this.http.delete(url, baseOptions) as Observable<T>;
      default:
        return throwError(() => new Error(`Unsupported HTTP method: ${method}`));
    }
  }

  getContratti(pageNumber: number): Observable<Contratti[]> {
    return this.secureApiCall<Contratti[]>(
      'GET',
      `${this.contrattiUrl}?pagina=${pageNumber}`
    );
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

    return this.secureApiCall<HttpResponse<Contratti[]>>(
      'GET',
      this.contrattiUrl,
      null,
      { params, observe: 'response' }
    );
  }

  getContrattiById(id: number): Observable<Contratti> {
    return this.secureApiCall<Contratti>(
      'GET',
      `${this.contrattiUrl}/${id}`
    );
  }

  getUnitaImmobiliare(): Observable<HttpResponse<ModelLight>> {
    return this.secureApiCall<HttpResponse<ModelLight>>(
      'GET',
      `${this.patrimonioUrl}/light`,
      null,
      { observe: 'response' }
    );
  }

  getIntestatari(): Observable<HttpResponse<ModelLight>> {
    return this.secureApiCall<HttpResponse<ModelLight>>(
      'GET',
      `${this.anagraficaUrl}/light`,
      null,
      { observe: 'response' }
    );
  }

  uploadDocument(contrattoId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.contrattiUrl}/contratti/${contrattoId}/documenti`, formData);
  }

  updateContratto(){}
}