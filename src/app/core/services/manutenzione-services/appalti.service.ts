import { Inject, Injectable } from '@angular/core';
import { Appaltio } from '../../models/manutenzione.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface AppaltiSearchParams{
  pagina?: number;
  codiceCIG?: string;
  codiceCUP?: string;
  stato?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppaltiService {
// /manutenzione/appalti?pagina=0&codiceCIG=123ABC&codiceCUP=XYZ789&stato=ATTIVO
constructor(
  @Inject('manutenzioneUrl') private url: string,
  private http: HttpClient) { }

  getAppalti(params: AppaltiSearchParams): Observable<any> {
   
    let httpParams = new HttpParams()
      .set('pagina', (params.pagina || 0).toString());

    if (params.codiceCIG) {
      httpParams = httpParams.set('codiceCIG', params.codiceCIG);
    }
    if (params.codiceCUP) {
      httpParams = httpParams.set('codiceCUP', params.codiceCUP);
    }
    if (params.stato) {
      httpParams = httpParams.set('stato', params.stato);
    }
 
      return this.http.get<Appaltio[]>(`${this.url}/appalti`, {
        params: httpParams,
        observe: 'response'
      }).pipe(
        catchError(error => { throw error; })
      );
}  

}
