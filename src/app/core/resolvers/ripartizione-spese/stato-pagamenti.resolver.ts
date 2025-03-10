import { ResolveFn } from '@angular/router';
import { StatoPagamenti, StatoPagamentiService } from '../../services/ripartizione-spese/stato-pagamenti.service';
import { inject } from '@angular/core';

export const statoPagamentiResolver: ResolveFn<StatoPagamenti[]> = (route, state) => {
  const statoPagamentiService = inject(StatoPagamentiService);
  return statoPagamentiService.getAllStatoPagamenti();
};
