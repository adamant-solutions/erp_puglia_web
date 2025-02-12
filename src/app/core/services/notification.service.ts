import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastNotification {
  message: string;
  type: 'success' | 'error';
  timeout?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: ToastNotification[] = [];
  private notificationsSubject = new BehaviorSubject<ToastNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  addNotification(notification: ToastNotification) {
    this.notifications.push(notification);
    this.notificationsSubject.next([...this.notifications]);

    if (notification.timeout) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.timeout);
    }
  }

  removeNotification(notification: ToastNotification) {
    this.notifications = this.notifications.filter(n => n !== notification);
    this.notificationsSubject.next([...this.notifications]);
  }
}
