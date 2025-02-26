import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { NotificationpanelComponent } from '../notificationpanel/notificationpanel.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode: boolean = false;
    notifications: any[] = [];

  constructor(private themeService: ThemeService,private router: Router,private dialog: MatDialog, private notificationService: NotificationService) {}




  toggleTheme() {
    this.themeService.toggleTheme();
    console.log('Theme toggled');
  }

  openitem(link: string) {
    this.router.navigate([`/${link}`]);
  }

  openNotifications(){
      console.log('Opening Notifications');
      this.dialog.open(NotificationpanelComponent, {
        position: { right: '5vw', top: '10vh' },
        width: '400px',
        height: '500px',
        data: { name: 'Notification Panel' }
      });
  }
}
