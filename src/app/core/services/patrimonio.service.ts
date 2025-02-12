import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Patrimonio } from '../models/patrimonio.model';
import { PatrimonioSearchParams } from '../resolvers/patrimonio.resolver';

@Injectable({
  providedIn: 'root',
})
export class PatrimonioService {
  constructor(
    private http: HttpClient,
    @Inject('patrimonioUrl') private patrimonioUrl: string,
  ) {}

      getFilteredPatrimonio(params: PatrimonioSearchParams): Observable<any> {
        let httpParams = new HttpParams()
          .set('pagina', (params.pagina || 0).toString());

        if (params.comune) {
          httpParams = httpParams.set('comune', params.comune);
        }
        if (params.indirizzo) {
          httpParams = httpParams.set('indirizzo', params.indirizzo);
        }
        if(params.statoDisponibilita){
          httpParams = httpParams.set('statoDisponibilita', params.statoDisponibilita);
        }

          return this.http.get<Patrimonio[]>(this.patrimonioUrl, {
            params: httpParams,
            observe: 'response'
          }).pipe(
            catchError(error => { throw error; })
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
        catchError(error => throwError(() => new Error('Failed to update Unità Immobiliare')))
      );
  }

  deletePatrimonio(patrimonioId: number): Observable<any> {
    return this.http.delete(`${this.patrimonioUrl}/${patrimonioId}`)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to delete Unità Immobiliare and its documents')))
      );
  }

  deleteDocument(patrimonioId: number, documentoId: number): Observable<any> {
    return this.http.delete(`${this.patrimonioUrl}/${patrimonioId}/documenti/${documentoId}`)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to delete document')))
      );
  }
}