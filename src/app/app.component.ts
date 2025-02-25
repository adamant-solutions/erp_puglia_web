import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'erp-puglia';

  removeOverlay() {
    const entryOverlay = document.querySelector('.entry-overlay');
    if (entryOverlay) {
      (entryOverlay as HTMLElement).style.opacity = '0';
      (entryOverlay as HTMLElement).style.visibility = 'hidden';
    }
  }
}
