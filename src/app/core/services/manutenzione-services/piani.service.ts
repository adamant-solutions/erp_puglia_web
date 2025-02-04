import { Inject, Injectable } from '@angular/core';
import { Piani } from '../../models/manutenzione.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface PianiSearchParams {
  pagina?: number;
  descrizione?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PianiService {
///manutenzione/piani?pagina=0&descrizione=test
constructor(
  @Inject('manutenzioneUrl') private url: string,
  private http: HttpClient) { }

  getPiani(params: PianiSearchParams): Observable<any> {
   
    let httpParams = new HttpParams()
      .set('pagina', (params.pagina || 0).toString());

    if (params.descrizione) {
      httpParams = httpParams.set('descrizione', params.descrizione);
    }

      return this.http.get<Piani[]>(`${this.url}/piani`, {
        params: httpParams,
        observe: 'response'
      }).pipe(
        catchError(error => { throw error; })
      );
}  

}
