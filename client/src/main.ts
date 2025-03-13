import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment.prod';


if (environment.production) {
  if(typeof window!=undefined){
  window.console.log = () => { }
  }
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // setEnvironmentInApp(config);
  // if (window.deploymentEnvironment !== 'development') {
  //   enableProdMode();
  // }

