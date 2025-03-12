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
  constructor(private router: Router) {}
  adminpages:any;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
        this. adminpages = [
          {
            title: 'Student Management',
            icon: 'account_circle',
            link: 'admin/student',
          },
          {
            title: 'Teacher Management',
            icon: 'work',
            link: 'admin/teacher',
          },
          {
            title: 'Course Management',
            icon: 'library_books',
            link: 'admin/course',
          },
          {
            title: 'Department Management',
            icon: 'school',
            link: 'admin/department',
          },
          {
            title: 'Preferences',
            icon: 'settings',
            link: 'admin/preferences',
          },
          {
            title: 'Calendar',
            icon: 'calendar_today',
            link: 'admin/calendar',
          },
        ];
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.adminpages, event.previousIndex, event.currentIndex);
    // if (window) {
    //   console.log(event.previousIndex, event.currentIndex, this.adminpages);
    // }
  }


  openitem(link: string): void {
    this.router.navigate([`/${link}`]);
  }
}
