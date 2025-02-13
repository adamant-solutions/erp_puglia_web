import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  showLoader() {
    if (this.activeRequests === 0) {
      this.isLoadingSubject.next(true);
    }
    this.activeRequests++;
  }

  hideLoader() {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.isLoadingSubject.next(false);
    }
  }
}