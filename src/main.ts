import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { NotificationpanelComponent } from './app/components/notificationpanel/notificationpanel.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injector } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Create the custom element (web component)
platformBrowserDynamic().bootstrapModule(NotificationpanelComponent).then((ref) => {
  const injector: Injector = ref.injector;
  const notificationElement = createCustomElement(NotificationpanelComponent, { injector });
  customElements.define('notification-panel', notificationElement);
});
