import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService,private router: Router) {}

  ngOnInit() {

  }


  toggleTheme() {
    this.themeService.toggleTheme();
    console.log('Theme toggled');
  }

  openitem(link: string) {
    this.router.navigate([`/${link}`]);
  }

}
