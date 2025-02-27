import { NotificationService } from './../../services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-notificationpanel',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './notificationpanel.component.html',
  styleUrls: ['./notificationpanel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationpanelComponent {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    console.log("Notification panel initialized");
    this.notificationService.getnotifications().subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications);
    })
  }

  markAsRead(event: any) {
    console.log('onmarkasread event triggered', event);
    const notificationId = event.detail.timestamp;
    this.notifications = this.notifications.map((notif) =>
      notif.timestamp === notificationId ? { ...notif, read: true } : notif
    );
    console.log(this.notifications);
  }
}
