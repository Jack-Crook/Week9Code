import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

// App-wide setup: turns on the features the app needs
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // report errors that nothing else catches
    provideRouter(routes),                // page navigation using app.routes.ts
    provideHttpClient(withFetch()),       // lets ProductService make HTTP requests
    provideClientHydration(),             // part of Angular's server side rendering setup
  ],
};
