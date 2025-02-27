import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxaddComponent } from './dialogbox/dialogboxadd/dialogboxadd.component';
import { DialogboxgetComponent } from './dialogbox/dialogboxget/dialogboxget.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'edu-track';
  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.initializeTheme();
  }
}
