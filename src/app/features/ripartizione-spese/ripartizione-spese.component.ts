import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ripartizione-spese',
  templateUrl: './ripartizione-spese.component.html',
  styleUrls: ['./ripartizione-spese.component.css']
})
export class RipartizioneSpeseComponent {
  tabs = [
    { path: 'condomini', label: 'Condomini' },
    { path: 'periodi-gestione', label: 'Periodi Gestione' },
    { path: 'voci-spesa', label: 'Voci Spesa' },
    { path: 'stato-pagamenti', label: 'Stato Pagamenti' }
  ];
  pageTitle = 'Ripartizione Spese'
  activeTab: string = 'condomini';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentPath = event.urlAfterRedirects.split('/');
      const basePathIndex = currentPath.findIndex(segment => 
        segment === 'ripartizione-spese');
      if (basePathIndex !== -1 && currentPath[basePathIndex + 1]) {
        this.activeTab = currentPath[basePathIndex + 1];
      }
    });
  }
}