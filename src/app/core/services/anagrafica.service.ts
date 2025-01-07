import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';

@Injectable({
  providedIn: 'root',
})
export class AnagraficaService {
  private token: string | null = null; // Store the token here

  constructor(
    @Inject('tokenUrl') private tokenUrl: string,
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    private http: HttpClient
  ) {}

  // Fetch token
  private getToken(scope: 'erp:read' | 'erp:write'): Observable<string> {
    const headers = new HttpHeaders({
      Authorization:
        scope === 'erp:read'
          ? 'Basic cmVhZGVyOnNlY3JldC1yZWFkZXI='
          : 'Basic d3JpdGVyOnNlY3JldC13cml0ZXI=',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `grant_type=client_credentials&scope=${scope}`;

    return this.http
      .post<{ access_token: string }>(this.tokenUrl, body, { headers })
      .pipe(
        switchMap((response) => {
          this.token = response.access_token; // Save the token
          return of(this.token);
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  // Helper function to add Authorization header
  private getHeaders(): HttpHeaders {
    if (!this.token) {
      throw new Error('Token not generated. Please generate a token first.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // Secure API calls with token management
  private secureApiCall<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body: any = null,
    scope: 'erp:read' | 'erp:write' = 'erp:read'
  ): Observable<T> {
    if (!this.token) {
      // If no token, fetch it first
      return this.getToken(scope).pipe(
        switchMap(() => this.makeApiCall<T>(method, url, body))
      );
    } else {
      // Token already exists, proceed to make API call
      return this.makeApiCall<T>(method, url, body);
    }
  }

  private makeApiCall<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body: any = null
  ): Observable<T> {
    const headers = this.getHeaders();

    switch (method) {
      case 'GET':
        return this.http.get<T>(url, { headers }).pipe(
          catchError((error) => {
            throw error;
          })
        );
      case 'POST':
        return this.http.post<T>(url, body, { headers }).pipe(
          catchError((error) => {
            throw error;
          })
        );
      case 'PUT':
        return this.http.put<T>(url, body, { headers }).pipe(
          catchError((error) => {
            throw error;
          })
        );
      case 'DELETE':
        return this.http.delete<T>(url, { headers }).pipe(
          catchError((error) => {
            throw error;
          })
        );
      default:
        throw new Error('Unsupported HTTP method');
    }
  }

  // -------------------------------------------------------

  // Using secureApiCall

  // get anagrafica list by pagination
  getAnagrafica(pageNumber: number): Observable<Anagrafica[]> {
    return this.secureApiCall<Anagrafica[]>(
      'GET',
      `${this.anagraficaUrl}?pagina=${pageNumber}`
    );
  }

  getFilteredAnagrafica(
    pageNumber: number,
    nome: string,
    cognome: string,
    codiceFiscale: string
  ): Observable<Anagrafica[]> {
    return this.secureApiCall<Anagrafica[]>(
      'GET',
      `${this.anagraficaUrl}?pagina=${pageNumber}&nome=${nome}&cognome=${cognome}&codiceFiscale=${codiceFiscale}`
    );
  }

  getTotalItems(): Observable<any> {
    return this.secureApiCall<any>('GET', `${this.anagraficaUrl}/count`);
  }

  getAnagraficaById(id: number): Observable<Anagrafica> {
    return this.secureApiCall<Anagrafica>('GET', `${this.anagraficaUrl}/${id}`);
  }

  addAnagrafica(anagrafica: Anagrafica): Observable<Anagrafica> {
    return this.secureApiCall<Anagrafica>(
      'POST',
      `${this.anagraficaUrl}`,
      anagrafica,
      'erp:write'
    );
  }

  modificaAnagrafica(anagrafica: Anagrafica): Observable<Anagrafica> {
    return this.secureApiCall<Anagrafica>(
      'PUT',
      `${this.anagraficaUrl}`,
      anagrafica,
      'erp:write'
    );
  }

  deleteAnagrafica(id: number): Observable<Anagrafica> {
    return this.secureApiCall<Anagrafica>(
      'DELETE',
      `${this.anagraficaUrl}/${id}`,
      null,
      'erp:write'
    );
  }
}
