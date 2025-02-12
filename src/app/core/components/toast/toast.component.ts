import { Component } from '@angular/core';
import { ToastNotification, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  notifications: ToastNotification[] = [];
  notifications$ = this.notificationService.notifications$
  constructor(private notificationService: NotificationService) {
  }

  remove(notification: ToastNotification) {
    this.notificationService.removeNotification(notification);
  }

  getNotificationClass(notification: any): string {
    return notification.type === 'success' ? 'with-icon success' : 'with-icon error';
  }
}
