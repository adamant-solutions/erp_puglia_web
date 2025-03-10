import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Condominio } from '../../models/condominio.model';


@Injectable({
  providedIn: 'root'
})
export class CondominioService {


  constructor(private http: HttpClient,
     @Inject('condominiUrl') private condominiUrl: string,
     @Inject('patrimonioUrl') private patrimonioUrl:string
  ) {}

  getAllCondomini(): Observable<any> {
    return this.http.get<Condominio[]>(this.condominiUrl, { 
      observe: 'response' 
    });
  }

  getCondomini(pagina: number, size: number, codice?: string, denominazione?: string, comune?: string, provincia?: string): Observable<any> {
    let params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('size', size.toString());
  
    if (codice) params = params.set('codice', codice);
    if (denominazione) params = params.set('denominazione', denominazione);
    if (comune) params = params.set('comune', comune);
    if (provincia) params = params.set('provincia', provincia);
  
    return this.http.get<Condominio[]>(this.condominiUrl, { 
      params,
      observe: 'response' 
    });
  }


  getCondominioById(id: number): Observable<Condominio> {
    return this.http.get<Condominio>(`${this.condominiUrl}/${id}`);
  }


  getCondominioDetails(): Observable<any> {
    return this.http.get<any>(`${this.condominiUrl}/details`);
  }

  createCondominio(condominio: Condominio): Observable<Condominio> {
    return this.http.post<Condominio>(this.condominiUrl, condominio);
  }

  updateCondominio(condominio: Condominio): Observable<Condominio> {
  
    return this.http.put<Condominio>(`${this.condominiUrl}`, condominio);
  }

  deleteCondominio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.condominiUrl}/${id}`);
  }



  addUnitaToCondominio(condominioId: number, unitaId: number): Observable<void> {
    return this.http.post<void>(`${this.condominiUrl}/${condominioId}/unita/${unitaId}`, {});
  }

  removeUnitaFromCondominio(condominioId: number, unitaId: number): Observable<void> {
    return this.http.delete<void>(`${this.condominiUrl}/${condominioId}/unita/${unitaId}`);
  }

  getUnitaIdsForCondominio(condominioId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.condominiUrl}/${condominioId}/unita`);
  }

  getUnitaImmobiliare(): Observable<any> {
    return this.http.get<any>(`${this.patrimonioUrl}/light`);
  }

}