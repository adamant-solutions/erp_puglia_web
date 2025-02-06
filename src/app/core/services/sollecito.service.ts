import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sollecito } from '../models/sollecito.model';
export enum EsitoInvioSollecito {
  CONSEGNATO = 'CONSEGNATO',
  NON_CONSEGNATO = 'NON_CONSEGNATO',
  RIFIUTATO = 'RIFIUTATO',
  IN_CONSEGNA = 'IN_CONSEGNA',
  SMARRITO = 'SMARRITO'
}
@Injectable({
  providedIn: 'root',
})
export class SollecitoService {
  constructor(
    private http: HttpClient,
    @Inject('morositaUrl') private morositaUrl: string
  ) {}

  getSollecitiByMorositaId(morositaId: number): Observable<Sollecito[]> {
    return this.http.get<Sollecito[]>(`${this.morositaUrl}/${morositaId}/solleciti`);
  }

  getSollecitoById(morositaId: number, sollecitoId: number): Observable<Sollecito> {
    return this.http.get<Sollecito>(`${this.morositaUrl}/${morositaId}/solleciti/${sollecitoId}`);
  }

  updateEsitoSollecito(morositaId: number, sollecitoId: number, esitoInvio: EsitoInvioSollecito): Observable<any> {
    return this.http.patch(
      `${this.morositaUrl}/${morositaId}/solleciti/${sollecitoId}/esito`,
      null,
      { params: { esitoInvio } }
    );
  }

  updateRispostaSollecito(morositaId: number, sollecitoId: number, esitoRisposta?: string): Observable<any> {
    return this.http.patch(
      `${this.morositaUrl}/${morositaId}/solleciti/${sollecitoId}/risposta`,
      null,
      { params: { esitoRisposta: esitoRisposta || '' } }
    );
  }

  createSollecito(morositaId: number, sollecito: Sollecito): Observable<Sollecito> {
    return this.http.post<Sollecito>(`${this.morositaUrl}/${morositaId}/solleciti`, sollecito);
  }

}
