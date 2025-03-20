import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header.component';
import { LoadingcomponentComponent } from "./components/loadingcomponent/loadingcomponent.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingcomponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'edu-track';
  constructor(public themeService: ThemeService) {
    this.themeService.initializeTheme();
  }
}
