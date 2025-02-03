import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Morosita } from '../models/morosita.model'; 

@Injectable({
  providedIn: 'root',
})
export class MorositaService {


  constructor(private http: HttpClient,
    @Inject('morositaUrl') private morositaUrl: string
  ) {}

 
  getAllMorosita(): Observable<Morosita[]> {
    return this.http.get<Morosita[]>(this.morositaUrl);
  }
  getMorositaById(id: number): Observable<Morosita> {
    const url = `${this.morositaUrl}/${id}`; 
    return this.http.get<Morosita>(url);
  }
}