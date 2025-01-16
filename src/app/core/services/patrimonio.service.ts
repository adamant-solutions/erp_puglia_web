import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Patrimonio } from '../models/patrimonio.model';

@Injectable({
  providedIn: 'root',
})
export class PatrimonioService {
  private token: string | null = null; // Store the token here
  private tokenExpiry: number | null = null;

  constructor(
    @Inject('tokenUrl') private tokenUrl: string,
    @Inject('patrimonioUrl') private patrimonioUrl: string,
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
      if (this.tokenExpiry && this.tokenExpiry > Date.now()) {
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
          })
        );
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  // -------------------------------------------------------

  // Using secureApiCall

  // get patrimonio list
  getPatrimonio(): Observable<Patrimonio[]> {
    return this.secureApiCall<Patrimonio[]>('GET', `${this.patrimonioUrl}`);
  }

  getFilteredPatrimonio(
    comune: string,
    indirizzo: string,
    statoDisponibilita: string
  ): Observable<Patrimonio[]> {
    return this.secureApiCall<Patrimonio[]>(
      'GET',
      `${this.patrimonioUrl}?comune=${comune}&indirizzo=${indirizzo}&statoDisponibilita=${statoDisponibilita}`
    );
  }

  getTotalItems(): Observable<any> {
    return this.secureApiCall<any>('GET', `${this.patrimonioUrl}/count`);
  }

  getPatrimonioById(id: number): Observable<Patrimonio> {
    return this.secureApiCall<Patrimonio>('GET', `${this.patrimonioUrl}/${id}`);
  }

  addPatrimonio(patrimonio: Patrimonio): Observable<Patrimonio> {
    return this.secureApiCall<Patrimonio>(
      'POST',
      `${this.patrimonioUrl}`,
      patrimonio,
      'erp:write'
    );
  }

  modificaPatrimonio(patrimonio: Patrimonio): Observable<Patrimonio> {
    const formData = new FormData();

    formData.append(
      'unitaImmobiliare',
      new Blob([JSON.stringify(patrimonio)], { type: 'application/json' })
    );

    return this.secureApiCall<Patrimonio>(
      'PUT',
      `${this.patrimonioUrl}`,
      formData,
      'erp:write'
    );
  }

  deletePatrimonio(id: number): Observable<Patrimonio> {
    return this.secureApiCall<Patrimonio>(
      'DELETE',
      `${this.patrimonioUrl}/${id}`,
      null,
      'erp:write'
    );
  }
}
