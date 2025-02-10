
import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Richiesta } from '../../models/manutenzione.model';

export interface RichiesteSearchParams {
  pagina?: number;
  descrizione?: string;
  stato?: string;
}


@Injectable({
  providedIn: 'root'
})
export class RichiesteService {


  // /manutenzione/richieste?descrizione=perdita%20acqua&stato=APERTA&pagina=0
constructor(
  @Inject('manutenzioneUrl') private url: string,
  private http: HttpClient) { }

  getRichieste(params: RichiesteSearchParams): Observable<any> {
   
    let httpParams = new HttpParams()
    .set('pagina', (params.pagina || 0).toString());

  if (params.descrizione) {

    httpParams = httpParams.set('descrizione', params.descrizione);
  }
  if (params.stato) {
    httpParams = httpParams.set('stato', params.stato);
  }
      return this.http.get<Richiesta[]>(`${this.url}/richieste`, {
        params: httpParams,
        observe: 'response'
      }).pipe(
        catchError(error => { throw error; })
      );
}  

  getRichiestaByid(id: number): Observable<Richiesta>{
    return this.http.get<Richiesta>(`${this.url}/richieste/`+id).pipe(
      catchError(error => { throw error; })
    );
  }

  
getRichiesteLight(): Observable<Richiesta>{
  return this.http.get<Richiesta>(`${this.url}/richieste/light`).pipe(
    catchError(error => { throw error; })
  );
}

  addRichiesta(richiesta: Richiesta): Observable<Richiesta>{
    return this.http.post<Richiesta>(`${this.url}/richieste`,richiesta).pipe(
        catchError(error => { throw error; })
      );
  }

  editRichiesta(richiesta: Richiesta): Observable<Richiesta>{
    return this.http.put<Richiesta>(`${this.url}/richieste`,richiesta).pipe(
        catchError(error => { throw error; })
      );
  }

  deleteRichiesta(id: number): Observable<Richiesta>{
    return this.http.delete<Richiesta>(`${this.url}/richieste/`+id).pipe(
        catchError(error => { throw error; })
      );
  }
}
