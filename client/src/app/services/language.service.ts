import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  getCurrentLanguage(): string {
    console.log(this.translate.currentLang);
    
    return this.translate.currentLang;
  }

  initializeLanguage(): void {
    this.translate.use('en');
  }
}
