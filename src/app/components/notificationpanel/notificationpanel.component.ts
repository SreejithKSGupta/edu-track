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

  notifications =[
    {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from Jane Smith.',
      timestamp: '2023-10-02T11:30:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from James Lee.',
      timestamp: '2023-10-02T12:00:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user details edited',
      message: 'You have a new message from Robert Brown.',
      timestamp: '2023-10-02T13:15:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from Emily Davis.',
      timestamp: '2023-10-03T09:20:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user details edited',
      message: 'You have a new message from Michael Wilson.',
      timestamp: '2023-10-03T09:45:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from Sarah Clark.',
      timestamp: '2023-10-04T14:00:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user details edited',
      message: 'You have a new message from David Johnson.',
      timestamp: '2023-10-04T15:10:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from Patricia Martinez.',
      timestamp: '2023-10-05T08:25:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from William Anderson.',
      timestamp: '2023-10-05T10:00:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user details edited',
      message: 'You have a new message from Karen Taylor.',
      timestamp: '2023-10-05T11:30:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from Chris Moore.',
      timestamp: '2023-10-06T13:40:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user details edited',
      message: 'You have a new message from Angela Harris.',
      timestamp: '2023-10-06T14:15:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from Brian Lee.',
      timestamp: '2023-10-07T10:05:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user Added',
      message: 'You have a new message from Lisa Young.',
      timestamp: '2023-10-07T11:25:00Z',
      read: false,
      data:[]
   },
   {
      title: 'New Message',
      type: 'user details edited',
      message: 'You have a new message from Joshua Scott.',
      timestamp: '2023-10-08T09:50:00Z',
      read: false,
      data:[]
   }
  ]

  markAsRead(message: any) {
    message.read = true;  // Mark the message as read when the button is clicked
  }
}
