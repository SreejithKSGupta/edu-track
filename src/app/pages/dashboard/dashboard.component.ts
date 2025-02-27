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
import { CalendarboxComponent } from '../../components/calendarbox/calendarbox.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    CalendarboxComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router, private cookieService: CookieService) {}
  adminpages:any;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const encryptedUsername = this.cookieService.get('username');
      if (!encryptedUsername) {
        console.log("user not signed in")
        this.router.navigate(['/signin']);
      } else {
        const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, 'your-secret-key').toString(CryptoJS.enc.Utf8);
        this. adminpages = [
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
          {
            title: 'Preferences',
            icon: 'settings',
            link: '/preferences',
          },
        ];
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.adminpages, event.previousIndex, event.currentIndex);
    if (window) {
      console.log(event.previousIndex, event.currentIndex, this.adminpages);
    }
  }


  openitem(link: string) {
    this.router.navigate([`/${link}`]);
  }
}
