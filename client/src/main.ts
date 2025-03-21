import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment.prod';
import { appConfig } from './app/app.config';
// const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(withFetch()),
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: HttpLoaderFactory,
//         deps: [HttpClient]
//       }
//     }).providers ?? []
//   ]
// };

if (environment.production) {
  if (typeof window != "undefined") {
    // window.console.log = () => { }
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));