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

import { MatMenuModule } from '@angular/material/menu';
import { violet, blue, magenta, orange } from '../header/model.colors';

function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);

  const brighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (brighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return 0; // Handle invalid color
  }

  const normalizedRgb = rgb.map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return (
    0.2126 * normalizedRgb[0] +
    0.7152 * normalizedRgb[1] +
    0.0722 * normalizedRgb[2]
  );
}

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

@Component({
  selector: 'app-header',
  imports:[MatIcon,MatButtonModule,MatBadgeModule,RouterModule, NgIf, CommonModule, MatMenuModule, MatSelectModule,MatFormFieldModule,FormsModule],
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

  setTheme(primaryPalette: 'custom-primary' | 'custom-violet' | 'custom-magenta', tertiaryPalette: 'custom-tertiary' | 'custom-blue' | 'custom-orange'): void {
    let primaryColor: string;
    let tertiaryColor: string;
    let primaryContrast: string;
    let tertiaryContrast: string;

    if (primaryPalette === 'custom-primary') {
      primaryColor = '#ff4081'; // Example custom color
    } else if (primaryPalette === 'custom-violet') {
      primaryColor = violet[500];
    } else {
      primaryColor = magenta[500];
    }

    if (tertiaryPalette === 'custom-tertiary') {
      tertiaryColor = '#00bcd4'; // Example custom color
    } else if (tertiaryPalette === 'custom-blue') {
      tertiaryColor = blue[500];
    } else {
      tertiaryColor = orange[500];
    }

    // Determine contrast colors
    primaryContrast = getContrastRatio(primaryColor, '#ffffff') >= 3 ? '#ffffff' : '#000000';
    tertiaryContrast = getContrastRatio(tertiaryColor, '#ffffff') >= 3 ? '#ffffff' : '#000000';

    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--tertiary-color', tertiaryColor);

    const primaryColorObject = {
      500: primaryColor,
      contrast: {
        500: primaryContrast,
      },
    };

    const tertiaryColorObject = {
      500: tertiaryColor,
      contrast: {
        500: tertiaryContrast,
      },
    };

    const themeObject = {
      color: {
        primary: primaryColorObject,
        tertiary: tertiaryColorObject,
      },
    };

    const themeClass = document.body.classList.contains('dark') ? 'dark' : '';

    if (themeClass) {
      document.body.classList.remove('dark');
    }

    document.body.classList.add(themeClass);

    if (themeClass) {
      document.body.classList.remove('dark');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('light');
    }
  }
}
