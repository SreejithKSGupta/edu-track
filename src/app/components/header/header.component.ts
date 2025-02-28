import { AdminserviceService } from './../../services/adminservice.service';
import { Component, computed, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { NotificationpanelComponent } from '../notificationpanel/notificationpanel.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, MatButtonModule, RouterModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode = false;
  authstate :any;

  notificationcount:any;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private adminservice: AdminserviceService
  ) {
    this.authstate = signal(this.adminservice.checkauth());
    this.notificationcount = this.notificationService.unreadCount();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  openitem(link: string) {
    this.router.navigate([`/${link}`]);
  }

  openNotifications() {
    this.dialog.open(NotificationpanelComponent, {
      position: { right: '5vw', top: '10vh' },
      width: '400px',
      height: '500px',
      data: { name: 'Notification Panel' },
    });
  }
}
