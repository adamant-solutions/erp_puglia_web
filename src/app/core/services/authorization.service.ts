import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  username: string;
  roles: string[];
}

export interface CurrentUser {
  username: string;
  roles: string[];
  nome?: string;
  cognome?: string;
  expiresAt: number;
}

const TOKEN_KEY = 'erp_token';
const USER_KEY = 'erp_user';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {

  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(this.readUserFromStorage());
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('loginUrl') private loginUrl: string
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password })
      .pipe(tap(res => this.persistSession(res)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const user = this.currentUserSubject.value;
    if (user && Date.now() >= user.expiresAt) {
      this.logout();
      return null;
    }
    return token;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  hasRole(role: string): boolean {
    const u = this.currentUserSubject.value;
    return !!u && u.roles.includes(role);
  }

  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  clearTokens(): void {
    this.logout();
  }

  persistSession(res: LoginResponse): void {
    const claims = this.decodeJwt(res.accessToken);
    const user: CurrentUser = {
      username: res.username,
      roles: res.roles || [],
      nome: claims?.nome,
      cognome: claims?.cognome,
      expiresAt: Date.now() + res.expiresIn * 1000
    };
    localStorage.setItem(TOKEN_KEY, res.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private readUserFromStorage(): CurrentUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      const u = JSON.parse(raw) as CurrentUser;
      if (Date.now() >= u.expiresAt) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        return null;
      }
      return u;
    } catch {
      return null;
    }
  }

  private decodeJwt(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
