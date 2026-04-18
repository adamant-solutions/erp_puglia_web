import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations],
})
export class AppComponent implements AfterViewInit {
  title = 'erp-puglia';

  entryOverlay!: HTMLElement | null;
  private readonly OVERLAY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

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
