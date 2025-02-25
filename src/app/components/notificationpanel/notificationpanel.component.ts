import { NotificationService } from './../../services/notification.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-notificationpanel',
  imports: [MatCardModule, CommonModule,MatButtonModule],
  templateUrl: './notificationpanel.component.html',
  styleUrls: ['./notificationpanel.component.scss']
})
export class NotificationpanelComponent {
  notifications: any[] = [];
  constructor(private notificationService: NotificationService) {}

  ngOnInit(){
    console.log("notification panel")
    this.notifications =  this.notificationService.getnotifications();
  }

  markAsRead(message: any) {
    message.read = true;  // Mark the message as read when the button is clicked
  }
}
