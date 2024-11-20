import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Anagrafica } from '../models/anagrafica.model';

@Injectable({
  providedIn: 'root',
})
export class AnagraficaService {
  constructor(
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    private http: HttpClient
  ) {}

  getAnagrafica(): Observable<Anagrafica[]> {
    return this.http.get<Anagrafica[]>(this.anagraficaUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
