import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-preferences',
  imports: [],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent {
  constructor(private themeService: ThemeService) {}


  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
