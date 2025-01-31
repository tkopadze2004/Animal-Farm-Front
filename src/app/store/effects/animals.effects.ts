import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnimalsService } from '../../services/animals.service';
import * as animalActions from '../actions/animals.actions';
import { catchError, map, of, switchMap } from 'rxjs';

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
          catchError((error) =>
            of(animalActions.getAnimalsDataFailure({ error: error.message }))
          )
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
          catchError((error) =>
            of(animalActions.feedAnimalDataFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
