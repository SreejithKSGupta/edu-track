import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  initializeLanguage(): void {
    this.translate.use('es');
  }
}
