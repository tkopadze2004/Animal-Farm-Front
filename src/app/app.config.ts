import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AnimalsReducer } from './store/reducers/animals.reducers';
import { AnimalsEffect } from './store/effects/animals.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PigReducer } from './store/reducers/pig.reducer';
import { PigEffect } from './store/effects/pig.effect';
import { MusicEffects } from './store/effects/music.effects';
import { musicReducer } from './store/reducers/music.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({
      animals: AnimalsReducer,
      pig: PigReducer,
      music: musicReducer,
    }),
    provideEffects(AnimalsEffect, PigEffect, MusicEffects),
    provideAnimationsAsync(),
  ],
};
