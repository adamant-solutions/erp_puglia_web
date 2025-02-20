import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Imprese } from '../../models/manutenzione.model';
import { catchError, Observable } from 'rxjs';
import { ModelLight } from '../../models/contratto.model';

export interface ImpreseSearchParams {
  pagina?: number;
  ragioneSociale?: string;
  partitaIva?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ImpreseService {

  constructor(
      @Inject('manutenzioneUrl') private url: string,
      private http: HttpClient) { }
// /manutenzione/imprese?pagina=0&ragioneSociale=Example&partitaIva=12345678901
   getImpresse(params: ImpreseSearchParams): Observable<any> {
      let httpParams = new HttpParams()
        .set('pagina', (params.pagina || 0).toString());

      if (params.ragioneSociale) {
        httpParams = httpParams.set('ragioneSociale', params.ragioneSociale);
      }
      if (params.partitaIva) {
        httpParams = httpParams.set('partitaIva', params.partitaIva);
      }

        return this.http.get<Imprese[]>(`${this.url}/imprese`, {
          params: httpParams,
          observe: 'response'
        }).pipe(
          catchError(error => { throw error; })
        );
}  

 getImpreseByid(id: number): Observable<Imprese>{
  return this.http.get<Imprese>(`${this.url}/imprese/`+id).pipe(
    catchError(error => { throw error; })
  );
}

getImpreseLight(): Observable<ModelLight[]>{
  return this.http.get<ModelLight[]>(`${this.url}/imprese/light`);
}

 addImprese(imprese: Imprese): Observable<Imprese>{
  return this.http.post<Imprese>(`${this.url}/imprese`,imprese).pipe(
      catchError(error => { throw error; })
    );
}
editImprese(imprese: Imprese): Observable<Imprese>{
  return this.http.put<Imprese>(`${this.url}/imprese`,imprese).pipe(
      catchError(error => { throw error; })
    );
}
deleteImprese(id: number): Observable<Imprese>{
  return this.http.delete<Imprese>(`${this.url}/imprese/`+id).pipe(
      catchError(error => { throw error; })
    );
}

 
}
