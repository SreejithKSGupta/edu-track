import { Injectable } from '@angular/core';
import { violet, blue, magenta, orange } from '../../app/components/header/model.colors';


@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() {
     this.initializetheme();
  }

  setTheme(primaryPalette: 'custom-primary' | 'custom-violet' | 'custom-magenta', tertiaryPalette: 'custom-tertiary' | 'custom-blue' | 'custom-orange'): void {
      let primaryColor: string;
      let tertiaryColor: string;

      if (primaryPalette === 'custom-primary') {
        primaryColor = '#ff4081';
      } else if (primaryPalette === 'custom-violet') {
        primaryColor = violet[500];
      } else {
        primaryColor = magenta[500];
      }

      if (tertiaryPalette === 'custom-tertiary') {
        tertiaryColor = '#00bcd4';
      } else if (tertiaryPalette === 'custom-blue') {
        tertiaryColor = blue[500];
      } else {
        tertiaryColor = orange[500];
      }

      this.applyTheme(primaryColor, tertiaryColor);

    }

  private applyTheme(primaryColor: string, tertiaryColor: string) {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--tertiary-color', tertiaryColor);
    localStorage.setItem('Primarycolor',primaryColor);
    localStorage.setItem('Secondarycolor',tertiaryColor)

  }

  private initializetheme(){
          const primaryColor=localStorage.getItem('Primarycolor')??'#9c27b0';
          const secondaryColor = localStorage.getItem('Secondarycolor')??'#2196f3';
          this.applyTheme(primaryColor,secondaryColor)
  }
}
