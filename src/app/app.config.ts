import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './interceptor/auth-interceptor';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CookieService} from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    ConfirmationService,
    provideAnimationsAsync(),
    MessageService,
    CookieService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    })
  ]
};
