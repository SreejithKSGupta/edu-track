import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'edu-track';
  constructor(public themeService: ThemeService, public languageService: LanguageService) {
    this.themeService.initializeTheme();
    this.languageService.initializeLanguage();
  }
}