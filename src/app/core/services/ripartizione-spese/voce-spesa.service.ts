import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoceSpesaDTO } from '../../models/voce-spesa.model';
import { PeriodoLight } from '../../models/periodi-gestione.model';
import { UnitaDisponibile } from '../../models/unita-disponibile.model';
import { QuotaVoceSpesa } from '../../models/quote-voce-spesa.model';
import { environment } from 'src/environments/environment';

export interface VoceSpesaSearchParams {
  descrizione?: string;
  periodoId?: string;
  page?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VoceSpesaService {
  private baseUrl = `${environment.speseUrl}/voci-spesa`;
  private periodoLightUrl = `${environment.speseUrl}/periodi/light`;
  private defaultPageSize = 10;

  constructor(private http: HttpClient) {}

  getVociSpesa(params: VoceSpesaSearchParams): Observable<HttpResponse<VoceSpesaDTO[]>> {
    let httpParams = new HttpParams()
      .set('page', (params.page || 0).toString())
     

    if (params.descrizione) {
      httpParams = httpParams.set('descrizione', params.descrizione);
    }

    if (params.periodoId !== undefined && params.periodoId !== null) {
      httpParams = httpParams.set('periodoId', params.periodoId.toString());
    }

    return this.http.get<VoceSpesaDTO[]>(this.baseUrl, {
      params: httpParams,
      observe: 'response'
    });
  }

  deleteVoceSpesa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createVoceSpesa(data: VoceSpesaDTO): Observable<VoceSpesaDTO> {
    return this.http.post<VoceSpesaDTO>(this.baseUrl, data);
  }

  getVoceSpesa(id: number): Observable<VoceSpesaDTO> {
    return this.http.get<VoceSpesaDTO>(`${this.baseUrl}/${id}`);
  }

  updateVoceSpesa(data: VoceSpesaDTO): Observable<VoceSpesaDTO> {
    return this.http.put<VoceSpesaDTO>(`${this.baseUrl}`, data);
  }

  getPeriodi(): Observable<PeriodoLight[]> {
    return this.http.get<PeriodoLight[]>(this.periodoLightUrl);
  }

  getUnitaDisponibili(voceSpesaId: number): Observable<UnitaDisponibile[]> {
    return this.http.get<UnitaDisponibile[]>(`${this.baseUrl}/${voceSpesaId}/unita-disponibili`);
  }

  addQuota(idVoce: number, quota: QuotaVoceSpesa): Observable<QuotaVoceSpesa> {
    return this.http.post<QuotaVoceSpesa>(
      `${this.baseUrl}/${idVoce}/quote`,
      quota
    );
  }

  updateQuota(idVoce: number, idQuota: number, quota: QuotaVoceSpesa): Observable<QuotaVoceSpesa> {
    return this.http.put<QuotaVoceSpesa>(
      `${this.baseUrl}/${idVoce}/quote/${idQuota}`,
      quota
    );
  }

  getVoceSpesaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getUnitaImmobiliariDisponibili(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/unita-disponibili`);
  }

  getQuote(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/quote`);
  }

  
  // getQuote(idVoce: number): Observable<QuotaVoceSpesa[]> {
  //   return this.http.get<QuotaVoceSpesa[]>(
  //     `${this.baseUrl}/${idVoce}/quote`
  //   );
  // }

  deleteQuota(idVoce: number, idQuota: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${idVoce}/quote/${idQuota}`
    );
  }
}