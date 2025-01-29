import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
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

  // get patrimonio list by pagination
  getPatrimonio(pageNumber: number): Observable<Patrimonio[]> {
    return this.secureApiCall<Patrimonio[]>(
      'GET',
      `${this.patrimonioUrl}?pagina=${pageNumber}`
    );
  }

  getFilteredPatrimonio(
    pageNumber: number,
    comune: string,
    indirizzo: string,
    statoDisponibilita: string
  ): Observable<Patrimonio[]> {
    return this.secureApiCall<Patrimonio[]>(
      'GET',
      `${this.patrimonioUrl}?pagina=${pageNumber}&comune=${comune}&indirizzo=${indirizzo}&statoDisponibilita=${statoDisponibilita}`,
      {
        params: { pageNumber, comune, indirizzo, statoDisponibilita },
        observe: 'response', // Ensures headers are included in the response
      }
    );
  }

  getTotalItems(): Observable<any> {
    return this.secureApiCall<any>('GET', `${this.patrimonioUrl}/count`);
  }

  getPatrimonioById(id: number): Observable<Patrimonio> {
    return this.secureApiCall<Patrimonio>('GET', `${this.patrimonioUrl}/${id}`);
  }

  addPatrimonio(formData: FormData): Observable<any> {
    return this.secureApiCall<Patrimonio>(
      'POST',
      `${this.patrimonioUrl}`,
      formData,
      'erp:write'
    );
  }

  downloadDocument(patrimonioId: number, documentoId: number): Observable<Blob> {
    return this.http.get(
      `${this.patrimonioUrl}/${patrimonioId}/documenti/${documentoId}/download`,
      {
        headers: this.getHeaders(),
        responseType: 'blob',
        observe: 'response'
      }
    ).pipe(
      map((response: HttpResponse<Blob>) => {
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        return new Blob([response.body as BlobPart], { type: contentType });
      }),
      catchError(error => {
        console.error('Download error:', error);
        return throwError(() => new Error('Failed to download document'));
      })
    );
  }

  modificaPatrimonio(patrimonio: Patrimonio, documenti?: File[]): Observable<Patrimonio> {
    const formData = new FormData();
    

    const unitaImmobiliareBlob = new Blob([JSON.stringify(patrimonio)], {
      type: 'application/json'
    });
    formData.append('unitaImmobiliare', unitaImmobiliareBlob, 'unitaImmobiliare.json');
    

    if (documenti && documenti.length > 0) {
      documenti.forEach((file) => {
     
        formData.append('documenti', file, file.name);
      });
    }
  
  
    console.log('FormData contents:');
    for (let pair of (formData as any).entries()) {
      console.log(pair[0], pair[1]);
    }
  
    return this.secureApiCall<Patrimonio>(
      'PUT',
      `${this.patrimonioUrl}`,
      formData,
      'erp:write'
    ).pipe(
      catchError(error => {
        console.error('Error in modificaPatrimonio:', error);
        return throwError(() => new Error('Failed to update patrimonio'));
      })
    );
  }

  deletePatrimonio(patrimonioId: number): Observable<any> {
    return this.secureApiCall<any>(
      'DELETE',
      `${this.patrimonioUrl}/${patrimonioId}`,
      null,
      'erp:write'
    ).pipe(
      catchError(error => {
        console.error('Delete error:', error);
        return throwError(() => new Error('Failed to delete patrimonio and its documents'));
      })
    );
  }
  deleteDocument(patrimonioId: number, documentoId: number): Observable<any> {
    return this.secureApiCall<any>(
      'DELETE',
      `${this.patrimonioUrl}/${patrimonioId}/documenti/${documentoId}`,
      null,
      'erp:write'
    ).pipe(
      catchError(error => {
        return throwError(() => new Error('Failed to delete document'));
      })
    );
  }
}