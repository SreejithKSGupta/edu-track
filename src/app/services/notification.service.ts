import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


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
   }
  ]

  getnotifications(){
    return this.notifications
  }
  }


