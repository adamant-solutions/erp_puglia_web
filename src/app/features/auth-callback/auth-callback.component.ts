import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService, LoginResponse } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthorizationService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const payload = this.decodePayload(token);
    if (!payload) {
      this.router.navigate(['/login']);
      return;
    }

    const loginResponse: LoginResponse = {
      accessToken: token,
      expiresIn: 3600,
      username: payload['sub'] || '',
      roles: payload['roles'] || []
    };

    this.auth.persistSession(loginResponse);
    this.router.navigate(['/anagrafica']);
  }

  private decodePayload(token: string): any | null {
    try {
      const part = token.split('.')[1];
      const json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
