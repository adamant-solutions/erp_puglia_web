import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  constructor(private router: Router) {}

  isCurrentRoute(routeName: string): boolean {
    return this.router.url.startsWith(`/${routeName}`);
  }
}
