import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementi per pagina:';
  override nextPageLabel = 'Pagina successiva';
  override previousPageLabel = 'Pagina precedente';
  override firstPageLabel = 'Prima pagina';
  override lastPageLabel = 'Ultima pagina';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 di ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} di ${length}`;
  };
}
