import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(AppRoutes), provideHttpClient(), provideNativeDateAdapter(), provideToastr(), provideAnimationsAsync()]
};
