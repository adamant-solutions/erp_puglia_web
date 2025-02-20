import { Inject, Injectable } from '@angular/core';
import { Interventi } from '../../models/manutenzione.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface InterventiSearchParams{
  pagina?: number;
  descrizione?: string;
  stato?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InterventiService {
// /manutenzione/interventi?descrizione=perdita%20acqua&stato=APERTA&pagina=0
constructor(
  @Inject('manutenzioneUrl') private url: string,
  private http: HttpClient) { }

  getInterventi(params: InterventiSearchParams): Observable<any> {
   
    let httpParams = new HttpParams()
      .set('pagina', (params.pagina || 0).toString());

    if (params.descrizione) {

      httpParams = httpParams.set('descrizione', params.descrizione);
    }
    if (params.stato) {
      httpParams = httpParams.set('stato', params.stato);
    }
 
      return this.http.get<Interventi[]>(`${this.url}/interventi`, {
        params: httpParams,
        observe: 'response'
      }).pipe(
        catchError(error => { throw error; })
      );
}  

getInterventoByid(id: number): Observable<Interventi>{
  return this.http.get<Interventi>(`${this.url}/interventi/`+id).pipe(
    catchError(error => { throw error; })
  );
}

addInterventi(interventi: Interventi): Observable<Interventi>{
  return this.http.post<Interventi>(`${this.url}/interventi`,interventi).pipe(
      catchError(error => { throw error; })
    );
}

editInterventi(interventi: Interventi): Observable<Interventi>{
  return this.http.put<Interventi>(`${this.url}/interventi`,interventi).pipe(
      catchError(error => { throw error; })
    );
}

deleteInterventi(id: number): Observable<Interventi>{
  return this.http.delete<Interventi>(`${this.url}/interventi/`+id).pipe(
      catchError(error => { throw error; })
    );
}

}
