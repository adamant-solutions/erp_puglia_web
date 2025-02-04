import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Morosita, MorositaSearchParams } from '../models/morosita.model'; 
import { ModelLight } from '../models/contratto.model';

@Injectable({
  providedIn: 'root',
})
export class MorositaService {


  constructor(private http: HttpClient,
    @Inject('morositaUrl') private morositaUrl: string,
    @Inject('contrattiUrl') private contrattiUrl: string
  ) {}

 
  getAllMorosita(searchMorosita:MorositaSearchParams): Observable<any> {
    let params = new HttpParams()
      .set('pagina', searchMorosita.pagina || 0)
    

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


  searchMorosita(params: MorositaSearchParams): Observable<any> {
    let queryParams = new HttpParams()
      .set('pagina', params.pagina?.toString() || '0');
  
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

  getContrattiLight(): Observable<ModelLight[]> {
    return this.http.get<ModelLight[]>(`${this.contrattiUrl}/light`);
  }
}
