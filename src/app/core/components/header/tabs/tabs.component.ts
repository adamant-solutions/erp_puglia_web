import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy {
  mobileOpen = false;

  private routerSub?: Subscription;
  private readonly mobileBreakpoint = 991.98;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.closeMobile());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.setBodyLock(false);
  }

  isCurrentRoute(routeName: string): boolean {
    return this.router.url.startsWith(`/${routeName}`);
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    this.setBodyLock(this.mobileOpen);
  }

  closeMobile(): void {
    if (this.mobileOpen) {
      this.mobileOpen = false;
      this.setBodyLock(false);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > this.mobileBreakpoint) {
      this.closeMobile();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobile();
  }

  private setBodyLock(lock: boolean): void {
    const method = lock ? 'addClass' : 'removeClass';
    this.renderer[method](document.body, 'erp-nav-open');
  }
}
