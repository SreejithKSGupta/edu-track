// theme.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeMode = signal<'light' | 'dark'>('light');

  toggleTheme() {
    this.themeMode.set(this.themeMode() === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', this.themeMode() === 'dark');
  }

  initializeTheme() {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.themeMode.set(initialTheme as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }
}
