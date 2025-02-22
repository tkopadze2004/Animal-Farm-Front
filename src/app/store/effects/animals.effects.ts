import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnimalsService } from '../../services/animals.service';
import * as animalActions from '../actions/animals.actions';
import { catchError, concat, delay, map, of, switchMap } from 'rxjs';
import { getPigStatus, getPigStatusSuccess } from '../actions/pig.actions';

@Injectable({ providedIn: 'root' })
export class AnimalsEffect {
  private readonly actions$ = inject(Actions);
  private readonly animalsService = inject(AnimalsService);

  getAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animalActions.getAnimalsData),
      switchMap(() =>
        this.animalsService.getAnimals().pipe(
          map((animals) => animalActions.getAnimalsDataSuccess({ animals })),
          catchError(({ error }) => {
            const feedError = error?.message || 'Failed to fetch animals';
            return of(animalActions.getAnimalsDataFailure({ error: feedError }));
          })
        )
      )
    )
  );
  
  feedAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animalActions.feedAnimal),
      switchMap((action) =>
        this.animalsService.feedAnimal(action.id).pipe(
          map((response) =>
            animalActions.feedAnimalSuccess({
              thanksCount: response.thanksCount,
              id: action.id,
              pigStatus: response.pigStatus,
              message: response.message,
            })
          ),
          catchError(({ error }) => {
            const feedError = error?.message || 'Server or network error';
            return of(animalActions.feedAnimalDataFailure({ feedError: feedError }));
          })
        )
      )
    )
  );
  
  feedAnimalSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animalActions.feedAnimalSuccess),
      switchMap(({ pigStatus }) =>
        concat(
          of(getPigStatusSuccess({ pigStatus })),
          of(getPigStatus()).pipe(delay(2500))
        )
      )
    )
  );
}
