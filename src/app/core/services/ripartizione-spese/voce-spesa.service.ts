import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoceSpesaDTO, VoceSpesaSearchParams } from '../../models/voce-spesa.model';
import { PeriodoLight } from '../../models/periodi-gestione.model';

@Injectable({ providedIn: 'root' })
export class VoceSpesaService {
  private baseUrl = 'spese/voci-spesa';
  private getLight = 'spese'

  constructor(private http: HttpClient) {}

  getVociSpesa(
    pagina: number = 0,
    size: number = 10,
    searchParams?: VoceSpesaSearchParams
  ): Observable<HttpResponse<VoceSpesaDTO[]>> {
    let params = new HttpParams()
      .set('page', pagina.toString())
      .set('size', size.toString());

    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<VoceSpesaDTO[]>(this.baseUrl, {
      params,
      observe: 'response'
    });
  }

  deleteVoceSpesa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createVoceSpesa(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getPeriodi(): Observable<PeriodoLight[]> {
    return this.http.get<PeriodoLight[]>(`${this.getLight}/periodi/light`);
  }
}