import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';

@Injectable({
  providedIn: 'root',
})
export class AnagraficaService {
  url = 'https://api.example.com/data';

  constructor(private http: HttpClient) {}

  getAnagrafica(): Observable<Anagrafica[]> {
    return this.http.get<Anagrafica[]>(this.url).pipe(
      catchError((error) => {
        // throw error;
        return of([]);
      })
    );
  }
}
