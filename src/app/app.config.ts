import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from 'environments/environment.development';
import { initializeApp } from 'firebase/app';

initializeApp(environment.firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule),
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideServiceWorker('firebase-messaging-sw.js', {
      enabled: true,
      registrationStrategy: 'registerImmediately',
    }),
  ],
};
