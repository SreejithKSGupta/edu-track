import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Injector } from '@angular/core';
import { MyCustomElementComponent } from './app/my-custom-element/my-custom-element.component';
import { createCustomElement } from '@angular/elements';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


(async () => {
  const app = await createApplication({
    providers: [],
  });

  const injector: Injector = app.injector;
  const MyCustomElement = createCustomElement(MyCustomElementComponent, { injector });
  customElements.define('hello-custom-element', MyCustomElement);
})();