import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AnimalsReducer } from './store/reducers/animals.reducers';
import { AnimalsEffect } from './store/effects/animals.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PigReducer } from './store/reducers/pig.reducer';
import { PigEffect } from './store/effects/pig.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({ animals: AnimalsReducer, pig: PigReducer }),
    provideEffects(AnimalsEffect, PigEffect),
    provideAnimationsAsync(),
    // provideAnimations()
  ],
};
