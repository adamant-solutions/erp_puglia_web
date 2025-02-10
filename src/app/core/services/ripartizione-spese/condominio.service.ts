// condominio.service.ts
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
  ) {}

  getAllCondomini(): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(this.condominiUrl);
  }

  getCondomini(page: number, size: number, codice?: string, denominazione?: string, comune?: string, provincia?: string): Observable<Condominio[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (codice) params = params.set('codice', codice);
    if (denominazione) params = params.set('denominazione', denominazione);
    if (comune) params = params.set('comune', comune);
    if (provincia) params = params.set('provincia', provincia);

    return this.http.get<Condominio[]>(this.condominiUrl, { params });
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
    return this.http.put<Condominio>(`${this.condominiUrl}/${condominio.id}`, condominio);
  }

  deleteCondominio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.condominiUrl}/${id}`);
  }
}