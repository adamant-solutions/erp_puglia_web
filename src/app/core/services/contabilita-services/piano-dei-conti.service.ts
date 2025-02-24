import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Children, Contabilita } from '../../models/contabilita.model';
import { catchError, Observable, throwError } from 'rxjs';

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
}
