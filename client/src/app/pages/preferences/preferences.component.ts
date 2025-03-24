import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { ColorsService } from '../../services/colors.service';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-preferences',
  imports: [MatButtonModule, MatMenu, MatMenuModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent {
  constructor(private themeService: ThemeService, private colorsService: ColorsService) {}


  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setTheme(primaryPalette: 'custom-primary' | 'custom-violet' | 'custom-magenta', tertiaryPalette: 'custom-tertiary' | 'custom-blue' | 'custom-orange'): void {
    this.colorsService.setTheme(primaryPalette, tertiaryPalette);
  }
}
