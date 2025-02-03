import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Patrimonio } from '../models/patrimonio.model';

@Injectable({
  providedIn: 'root',
})
export class PatrimonioService {
  constructor(
    private http: HttpClient,
    @Inject('patrimonioUrl') private patrimonioUrl: string,
  ) {}

  getPatrimonio(pageNumber: number): Observable<Patrimonio[]> {
    return this.http.get<Patrimonio[]>(`${this.patrimonioUrl}?pagina=${pageNumber}`)
      .pipe(
        catchError(error => throwError(() => error))
      );
  }

  getFilteredPatrimonio(
    pageNumber: number,
    comune: string,
    indirizzo: string,
    statoDisponibilita: string
  ): Observable<Patrimonio[]> {
    const queryParams = `?pagina=${pageNumber}&comune=${comune}&indirizzo=${indirizzo}&statoDisponibilita=${statoDisponibilita}`;
    return this.http.get<Patrimonio[]>(`${this.patrimonioUrl}${queryParams}`, { observe: 'response' })
      .pipe(
        map(response => response.body ?? []),
        catchError(error => throwError(() => error))
      );
  }

  getTotalItems(): Observable<any> {
    return this.http.get(`${this.patrimonioUrl}/count`)
      .pipe(
        catchError(error => throwError(() => error))
      );
  }

  getPatrimonioById(id: number): Observable<Patrimonio> {
    return this.http.get<Patrimonio>(`${this.patrimonioUrl}/${id}`)
      .pipe(
        catchError(error => throwError(() => error))
      );
  }

  addPatrimonio(formData: FormData): Observable<Patrimonio> {
    return this.http.post<Patrimonio>(`${this.patrimonioUrl}`, formData)
      .pipe(
        catchError(error => throwError(() => error))
      );
  }

  downloadDocument(patrimonioId: number, documentoId: number): Observable<Blob> {
    return this.http.get(
      `${this.patrimonioUrl}/${patrimonioId}/documenti/${documentoId}/download`,
      {
        responseType: 'blob',
        observe: 'response'
      }
    ).pipe(
      map((response: HttpResponse<Blob>) => {
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        return new Blob([response.body as BlobPart], { type: contentType });
      }),
      catchError(error => throwError(() => new Error('Failed to download document')))
    );
  }

  modificaPatrimonio(patrimonio: Patrimonio, documenti?: File[]): Observable<Patrimonio> {
    const formData = new FormData();
    
    const unitaImmobiliareBlob = new Blob([JSON.stringify(patrimonio)], {
      type: 'application/json'
    });
    formData.append('unitaImmobiliare', unitaImmobiliareBlob, 'unitaImmobiliare.json');

    if (documenti?.length) {
      documenti.forEach(file => {
        formData.append('documenti', file, file.name);
      });
    }

    return this.http.put<Patrimonio>(`${this.patrimonioUrl}`, formData)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to update patrimonio')))
      );
  }

  deletePatrimonio(patrimonioId: number): Observable<any> {
    return this.http.delete(`${this.patrimonioUrl}/${patrimonioId}`)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to delete patrimonio and its documents')))
      );
  }

  deleteDocument(patrimonioId: number, documentoId: number): Observable<any> {
    return this.http.delete(`${this.patrimonioUrl}/${patrimonioId}/documenti/${documentoId}`)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to delete document')))
      );
  }
}