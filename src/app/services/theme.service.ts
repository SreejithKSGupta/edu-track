import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeMode = signal<'light' | 'dark'>('light');  // ✅ Global signal

  toggleTheme() {
    this.themeMode.set(this.themeMode() === 'light' ? 'dark' : 'light');
  }
}
