import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Anagrafica } from '../models/anagrafica.model';
import { AnagraficaService } from '../services/anagrafica.service';

@Injectable({
  providedIn: 'root',
})
export class AnagraficaResolver implements Resolve<Anagrafica[]> {
  constructor(private anagraficaService: AnagraficaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Anagrafica[]> {
    return this.anagraficaService.getAnagrafica().pipe(
      catchError((error) => {
        // return of('Error: ' + error);
        // return of('No data');
        return of([]);
      })
    );
  }
}
