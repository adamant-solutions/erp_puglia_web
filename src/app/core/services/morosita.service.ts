import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Morosita, MorositaSearchParams } from '../models/morosita.model'; 

@Injectable({
  providedIn: 'root',
})
export class MorositaService {


  constructor(private http: HttpClient,
    @Inject('morositaUrl') private morositaUrl: string
  ) {}

 
  getAllMorosita(page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('pagina', page.toString())
      .set('dimensionePagina', size.toString());

    return this.http.get<any>(this.morositaUrl, { params });
  }

  getMorositaById(id: number): Observable<Morosita> {
    const url = `${this.morositaUrl}/${id}`;
    return this.http.get<Morosita>(url);
  }

  updateMorosita(id: number, morosita: Morosita): Observable<any> {
    const url = `${this.morositaUrl}/${id}`;
    return this.http.put<Morosita>(url, morosita);
  }


  searchMorosita(params: MorositaSearchParams, page: number = 0, size: number = 10): Observable<any> {
    let queryParams = new HttpParams()
      .set('pagina', page.toString())
      .set('dimensionePagina', size.toString());

    if (params.contrattoId) {
      queryParams = queryParams.set('contrattoId', params.contrattoId);
    }
    if (params.stato) {
      queryParams = queryParams.set('stato', params.stato);
    }
    if (params.importoMinimo) {
      queryParams = queryParams.set('importoMinimo', params.importoMinimo);
    }
    if (params.importoMassimo) {
      queryParams = queryParams.set('importoMassimo', params.importoMassimo);
    }

    return this.http.get<any>(this.morositaUrl, { params: queryParams });
  }
}
