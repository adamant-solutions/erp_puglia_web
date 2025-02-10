import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ripartizione-spese',
  templateUrl: './ripartizione-spese.component.html',
  styleUrls: ['./ripartizione-spese.component.css']
})
export class RipartizioneSpeseComponent {
  pageTitle = 'Ripartizione Spese';
  
  tabs = [
    { path: 'voci-spesa', label: 'Voci Spesa' },
    { path: 'stato-pagamenti', label: 'Stato Pagamenti' },
    { path: 'periodi-gestione', label: 'Periodi Gestione' },
    { path: 'condomini', label: 'Condomini' }
  ];

  activeTab: string = 'voci-spesa';

  constructor(private router: Router) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {

      const urlParts = event.url.split('/');
      this.activeTab = urlParts[urlParts.length - 1] || 'voci-spesa';
    });
  }
}