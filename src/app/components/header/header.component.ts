import { AdminserviceService } from './../../services/adminservice.service';
import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { NotificationpanelComponent } from '../notificationpanel/notificationpanel.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [MatIcon, MatButtonModule, RouterModule,MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode: boolean = false;
  notifications: any[] = [];
  authstate: boolean = true;
  notificationcount = 0;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private adminservice: AdminserviceService
  ) {
    this.authstate = this.adminservice.checkauth();
    console.log(this.authstate);
   this.notificationService.getnotificationcount().subscribe(res=>{
    this.notificationcount = res;
   });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    console.log('Theme toggled');
  }

  openitem(link: string) {
    this.router.navigate([`/${link}`]);
  }

  openNotifications() {
    console.log('Opening Notifications');
    this.dialog.open(NotificationpanelComponent, {
      position: { right: '5vw', top: '10vh' },
      width: '400px',
      height: '500px',
      data: { name: 'Notification Panel' },
    });
  }
}
