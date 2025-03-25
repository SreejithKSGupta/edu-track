import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
      this.translate.setDefaultLang(this.defaultLanguage());
    
  }

  defaultLanguage(): string{
    let language: string = 'fr';
    if (typeof window !== 'undefined' && window.localStorage) {
      language = localStorage.getItem('Language') || 'fr';
    }
    return language;
  }

  switchLanguage(language: string): void {
    localStorage.setItem("Language", language);
    this.translate.use(language);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  initializeLanguage(): void {
    this.translate.use(this.defaultLanguage());
  }
}
