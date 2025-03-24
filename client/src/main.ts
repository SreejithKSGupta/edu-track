import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment.prod';
import { appConfig } from './app/app.config';

if (environment.production) {
  if (typeof window != "undefined") {
    // window.console.log = () => { }
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));