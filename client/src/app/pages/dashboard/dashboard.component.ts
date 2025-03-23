import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  adminpages:{title:string, icon:string, link:string}[]=[];
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
        this. adminpages = [
          {
            title: 'DASHBOARD.CARD_TITLE.1',
            icon: 'account_circle',
            link: 'admin/student',
          },
          {
            title: 'DASHBOARD.CARD_TITLE.2',
            icon: 'work',
            link: 'admin/teacher',
          },
          {
            title: 'DASHBOARD.CARD_TITLE.3',
            icon: 'library_books',
            link: 'admin/course',
          },
          {
            title: 'DASHBOARD.CARD_TITLE.4',
            icon: 'school',
            link: 'admin/department',
          },
          {
            title: 'DASHBOARD.CARD_TITLE.5',
            icon: 'settings',
            link: 'admin/preferences',
          },
          {
            title: 'DASHBOARD.CARD_TITLE.6',
            icon: 'calendar_today',
            link: 'admin/calendar',
          },
        ];
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log( this.adminpages);
    moveItemInArray(this.adminpages, event.previousIndex, event.currentIndex);

  }


  openitem(link: string): void {
    this.router.navigate([`/${link}`]);
  }
}
