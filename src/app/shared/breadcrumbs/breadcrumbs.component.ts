import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent {
  @Input() crumbsList!: Array<{ link: string; label: string }>;
  @Input() currentPage!: string;
}
