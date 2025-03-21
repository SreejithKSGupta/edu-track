import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment.prod';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers ?? []
  ]
};

if (environment.production) {
  if (typeof window != "undefined") {
    // window.console.log = () => { }
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));