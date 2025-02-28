import { AdminserviceService } from './../../services/adminservice.service';
import { NotificationService } from './../../services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, CUSTOM_ELEMENTS_SCHEMA, destroyPlatform } from '@angular/core';


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
  user_id: string = '';

  constructor(private notificationService: NotificationService, private adminservice:AdminserviceService) {
    this.user_id =  this.adminservice.getuserid();
  }

  ngOnInit() {
    this.notificationService.getnotifications().subscribe((data) => {
      this.notifications = data;
      this.notifications = this.notifications.filter((notif) => !notif.read.includes(this.user_id));
    })
  }

  markAsRead(event: any) {
    const notificationId = event.detail._id;
    this.notifications = this.notifications.filter(
      (notif) => notif._id !== notificationId
    );
      this.notificationService.markNotifAsRead(notificationId);
  }

  closepopup(){

   }
}
