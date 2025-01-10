import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';

@Injectable({
  providedIn: 'root',
})
export class AnagraficaService {
  private token: string | null = null; // Store the token here
  private tokenExpiry: number | null = null;

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
      .post<{ access_token: string; expires_in: number }>(this.tokenUrl, body, {
        headers,
      })
      .pipe(
        switchMap((response) => {
          this.token = response.access_token; // Save the token
          this.tokenExpiry = Date.now() + response.expires_in * 1000 - 5000; // Buffer of 5 seconds
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
        switchMap(() => this.makeApiCall<T>(method, url, body)),
        catchError((error) => {
          console.error('Token fetch failed', error);
          return throwError(() => new Error('Unable to fetch token.'));
        })
      );
    } else {
      // If token has expired, re-fetch it
      if (this.token && this.tokenExpiry && this.tokenExpiry > Date.now()) {
        return this.getToken(scope).pipe(
          switchMap(() => this.makeApiCall<T>(method, url, body)),
          catchError((error) => {
            console.error('Token fetch failed', error);
            return throwError(() => new Error('Unable to fetch token.'));
          })
        );
      } else {
        // Token already exists, proceed to make API call
        return this.makeApiCall<T>(method, url, body);
      }
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
            /*
            switch (error.status) {
              case 403:
                return throwError(() => new Error('Unauthorized access, token reset'));
              case 404:
                return throwError(() => new Error('Record not found'));
              case 500:
              case 502:
              case 503:
              case 504:
                return throwError(() => new Error('Server error'));
              default:
                return throwError(() => new Error('Failed to delete'));
            }
            */
          })
        );
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
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
