import { ResolveFn } from '@angular/router';
import { PianoDeiContiService } from '../../services/contabilita-services/piano-dei-conti.service';
import { inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { PianoDeiConti } from '../../models/contabilita/piano-dei-conti.model';


export const pianoDeiContiResolver: ResolveFn<any> = (route, state) => {
  const pianoCService = inject(PianoDeiContiService);
  return pianoCService.getAllPianoDeiConti();
};

export const pianoDeiContiByIDResolver: ResolveFn<any> = (route, state) => {
  const pianoCService = inject(PianoDeiContiService);
  const id = route.params['id']
  return pianoCService.getPianoDeiContiById(id);
};

export const pianoDeiContiByIDparentCodiceResolver: ResolveFn<any> = (route, state) => {
  const pianoCService = inject(PianoDeiContiService);
  const id = route.params['id'];
  
  return forkJoin({
    allItems: pianoCService.getAllPianoDeiConti(),
    item: pianoCService.getPianoDeiContiById(id)
  }).pipe(
    map(({ allItems, item }) => {
      if (item.parentId) {
        const parentItem = allItems.find((parent: { id: number; }) => parent.id === item.parentId);
        if (parentItem) {
          item.parentCodice = parentItem.codice;
        }
      }
      return item;
    })
  );
};


export const pianoDeiContiparentResolver: ResolveFn<any> = (route, state) => {
  const pianoCService = inject(PianoDeiContiService);
  return pianoCService.getAllPianoDeiConti().pipe(
    map((items: PianoDeiConti[]) => {
  
      items.forEach(item => {
        if (item.parentId) {
          // find parent  
          const parentItem = items.find(parent => parent.id === item.parentId);
          if (parentItem) { 
            item.parentCodice = parentItem.codice;
          }
        }
      });
      return items;
    }))

}
  
