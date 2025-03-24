import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { ColorsService } from '../../services/colors.service';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '../../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

// import { violet, blue, magenta, orange } from '../header/model.colors';

@Component({
  selector: 'app-preferences',
  imports: [MatButtonModule,MatSlideToggleModule , MatMenuModule, MatBadgeModule, CommonModule, MatSelectModule,MatFormFieldModule,FormsModule, TranslateModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent {
  selectedLanguage: string;
  isDarkMode:boolean;
  languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'sp', label: 'Español' },
  ];

  constructor(private themeService: ThemeService, private colorsService: ColorsService,    private languageService: LanguageService
  ) {    this.selectedLanguage = this.languageService.getCurrentLanguage();
         this.isDarkMode = this.themeService.themeMode() === 'dark';
  }


  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onLanguageChange(languageCode: string): void {
    this.languageService.switchLanguage(languageCode);
    this.selectedLanguage = languageCode;
    console.log(this.languageService.getCurrentLanguage());
  }


  setTheme(primaryPalette: 'custom-primary' | 'custom-violet' | 'custom-magenta', tertiaryPalette: 'custom-tertiary' | 'custom-blue' | 'custom-orange'): void {
    this.colorsService.setTheme(primaryPalette, tertiaryPalette);
  }
}
