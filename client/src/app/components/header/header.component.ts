import { AdminserviceService } from '../../services/adminservice.service';
import { Component} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NotificationpanelComponent } from '../notificationpanel/notificationpanel.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports:[MatIcon,MatButtonModule,MatBadgeModule,RouterModule, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode: boolean = false;
  authState: Function;
  notificationCount: Function;

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private adminservice: AdminserviceService
  ) {
    this.authState = this.adminservice.isAuthenticated;
    this.notificationCount = this.notificationService.unreadCount;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }



  openNotifications(): void {
    this.dialog.open(NotificationpanelComponent, {
      position: { right: '5vw', top: '10vh' },
      width: '400px',
      height: '500px',
      data: { name: 'Notification Panel' },
    });
  }

  logout(): void {
    this.adminservice.logout();
  }
}
