import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), importProvidersFrom(MatToolbarModule), importProvidersFrom(CommonModule), importProvidersFrom(MatDialogModule), importProvidersFrom(MatSnackBarModule), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()]
};
