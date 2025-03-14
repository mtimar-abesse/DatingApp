import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), //ez kell http kérésekhez, ez egy dependency injection
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }) // Toastr providers - hibaüzenetekhez toaster
  ]
};
