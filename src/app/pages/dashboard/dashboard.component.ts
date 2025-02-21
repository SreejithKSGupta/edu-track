import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIconModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Get the encrypted username from cookies
      const encryptedUsername = this.cookieService.get('username');

      if (encryptedUsername) {
        // Decrypt the username
        const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, 'your-secret-key').toString(CryptoJS.enc.Utf8);

        // Log the decrypted username to the console
        console.log('Decrypted Username:', decryptedUsername);
      } else {
        console.log('No username found in cookies');
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.adminpages, event.previousIndex, event.currentIndex);
    if (window) {
      console.log(event.previousIndex, event.currentIndex, this.adminpages);
    }
  }

  adminpages = [
    {
      title: 'Student Management',
      icon: 'account_circle',
      link: '/student',
    },
    {
      title: 'Teacher Management',
      icon: 'work',
      link: '/teacher',
    },
    {
      title: 'Course Management',
      icon: 'library_books',
      link: '/course',
    },
    {
      title: 'Department Management',
      icon: 'school',
      link: '/department',
    },
  ];

  openitem(link: string) {
    this.router.navigate([`/${link}`]);
  }
}
