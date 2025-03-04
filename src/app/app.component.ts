import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'erp-puglia';

  entryOverlay!: HTMLElement | null;
  private readonly OVERLAY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

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
