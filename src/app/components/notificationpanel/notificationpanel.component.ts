import { AdminserviceService } from './../../services/adminservice.service';
import { NotificationService } from './../../services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, CUSTOM_ELEMENTS_SCHEMA, computed, signal } from '@angular/core';

@Component({
  selector: 'app-notificationpanel',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './notificationpanel.component.html',
  styleUrls: ['./notificationpanel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationpanelComponent {
  user_id:any;

  notifications = computed(() =>
    this.notificationService.notifications().filter(notif => !notif.read.includes(this.user_id))
  );

  constructor(private notificationService: NotificationService, private adminservice: AdminserviceService) {
    this.user_id = this.adminservice.getuserid();

  }

  markAsRead(event: any) {
    const notificationId = event.detail._id;
    this.notificationService.markNotifAsRead(notificationId);
  }

}
