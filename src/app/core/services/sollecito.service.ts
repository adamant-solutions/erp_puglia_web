import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sollecito } from '../models/sollecito.model';

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
}
