import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService, CurrentUser } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentUser$: Observable<CurrentUser | null>;

  constructor(private auth: AuthorizationService, private router: Router) {
    this.currentUser$ = this.auth.currentUser$;
  }

  logout(): void { this.auth.logout(); }

  isAdmin(): boolean { return this.auth.hasRole('ADMIN'); }

  goToUtenti(): void { this.router.navigate(['/utenti']); }
}
