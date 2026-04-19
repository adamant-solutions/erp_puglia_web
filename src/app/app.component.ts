import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { routeAnimations } from './app.animations';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations],
})
export class AppComponent implements AfterViewInit {
  title = 'erp-puglia';
  routeAnnouncement = '';

  entryOverlay!: HTMLElement | null;
  private readonly OVERLAY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

  constructor(
    private router: Router,
    private loader: LoaderService,
    private titleService: Title
  ) {
    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError
        )
      )
      .subscribe((e) => {
        this.loader.reset();
        if (e instanceof NavigationEnd) {
          const title = this.titleService.getTitle();
          this.routeAnnouncement = title ? `Navigato a ${title}` : 'Pagina caricata';
          const main = document.getElementById('main-content');
          main?.focus({ preventScroll: false });
        }
      });
  }

  prepareRoute(outlet: RouterOutlet): string {
    if (!outlet || !outlet.isActivated) {
      return 'root';
    }
    return (
      outlet.activatedRouteData?.['animation'] ??
      outlet.activatedRoute?.snapshot?.url?.[0]?.path ??
      'root'
    );
  }

  ngAfterViewInit() {
    this.entryOverlay = document.querySelector('.entry-overlay');
    this.checkOverlayVisibility();
  }

  checkOverlayVisibility() {
    const lastDismissTime = localStorage.getItem('overlayDismissTime');
    const currentTime = new Date().getTime();

    if (
      lastDismissTime &&
      currentTime - parseInt(lastDismissTime, 10) < this.OVERLAY_TIMEOUT
    ) {
      this.hideOverlay();
    }
  }

  dismissOverlay() {
    this.hideOverlay();
    localStorage.setItem('overlayDismissTime', new Date().getTime().toString());
  }

  private hideOverlay() {
    this.entryOverlay?.classList.add('hidden-overlay');
  }
}
