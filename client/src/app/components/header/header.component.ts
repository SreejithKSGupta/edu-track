import { AdminserviceService } from '../../services/adminservice.service';
import { Component, Signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NotificationpanelComponent } from '../notificationpanel/notificationpanel.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule, NgIf } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports:[MatIcon,MatButtonModule,MatBadgeModule,RouterModule, NgIf, CommonModule,MatSelectModule,MatFormFieldModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode: boolean = false;
  authState: Signal<boolean>;
  notificationCount:Signal<number>;

  languages = [
    { code: 'es', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'sp', label: 'Español' },
  ];

  selectedLanguage: string;

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private adminservice: AdminserviceService,
    private languageService: LanguageService
  ) {
    this.authState = this.adminservice.isAuthenticated;
    this.notificationCount = this.notificationService.unreadCount;
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onLanguageChange(languageCode: string): void {
    this.languageService.switchLanguage(languageCode);
    this.selectedLanguage = languageCode;
    console.log(this.languageService.getCurrentLanguage());
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
