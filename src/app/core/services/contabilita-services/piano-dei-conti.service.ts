import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PianoDeiConti } from '../../models/contabilita/piano-dei-conti.model';

@Injectable({
  providedIn: 'root'
})
export class PianoDeiContiService {

  constructor(private http: HttpClient,
    @Inject('contabilitaUrl') private url: string,
  ) {}

  getAllPianoDeiConti(): Observable<any>{
    return this.http.get<any>(`${this.url}/piano-dei-conti`).pipe(
      catchError((error) =>
        throwError(() => error)))
  }

  getPianoDeiContiById(id: number){
    return this.http.get<any>(`${this.url}/piano-dei-conti/`+id).pipe(
      catchError((error) =>
        throwError(() => error)))
  }

  findByCodice(codice: string): Observable<PianoDeiConti> {
    return this.http.get<PianoDeiConti>(`${this.url}/piano-dei-conti/by-codice/${codice}`);
  }

  findByParent(parentId: number): Observable<PianoDeiConti[]> {
    return this.http.get<PianoDeiConti[]>(`${this.url}/piano-dei-conti/${parentId}/figli`);
  }

  findByTipo(tipo: string): Observable<PianoDeiConti[]> {
    return this.http.get<PianoDeiConti[]>(`${this.url}/piano-dei-conti/by-tipo/${tipo}`);
  }

  findAllLeaf(): Observable<PianoDeiConti[]> {
    return this.http.get<PianoDeiConti[]>(`${this.url}/piano-dei-conti/foglie`);
  }

  create(dto: PianoDeiConti): Observable<PianoDeiConti> {
    return this.http.post<PianoDeiConti>(`${this.url}/piano-dei-conti`, dto);
  }

  update(id: number, dto: PianoDeiConti): Observable<PianoDeiConti> {
    return this.http.put<PianoDeiConti>(`${this.url}/piano-dei-conti/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/piano-dei-conti/${id}`);
  }
  
}
