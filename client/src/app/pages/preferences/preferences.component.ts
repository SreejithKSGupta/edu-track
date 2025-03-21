import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-preferences',
  imports: [MatButtonModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent {
  constructor(private themeService: ThemeService) {}


  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
