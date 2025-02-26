import { NotificationService } from './../../services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-notificationpanel',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './notificationpanel.component.html',
  styleUrls: ['./notificationpanel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Allow unknown elements
})
export class NotificationpanelComponent implements AfterViewInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    console.log("Notification panel initialized");
    this.notifications = this.notificationService.getnotifications();
  }

  ngAfterViewInit() {
    customElements.whenDefined('notifications-panel').then(() => {
      const panel = document.querySelector('notifications-panel') as any;

      if (panel) {
        panel.notifications = this.notifications;

        panel.addEventListener('onmarkasread', (event: CustomEvent) => {
          const notificationId = event.detail;
          this.notifications = this.notifications.map((notif) =>
            notif.id === notificationId ? { ...notif, read: true } : notif
          );
        });
      }
    });
  }
}
