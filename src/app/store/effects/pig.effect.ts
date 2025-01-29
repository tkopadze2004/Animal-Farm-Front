import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PigStatusService } from '../../services/pig-status.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as pigActions from '../actions/pig.actions';

@Injectable({ providedIn: 'root' })
export class PigEffect {
  private readonly actions$ = inject(Actions);
  private readonly pigStatusService = inject(PigStatusService);
  pigStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pigActions.getPigStatus),
      switchMap(() =>
        this.pigStatusService.status().pipe(
          map((response) =>
            pigActions.getPigStatusSuccess({
              currentStatus: response.currentStatus,
            })
          ),
          catchError((error) =>
            of(pigActions.getPigStatusFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
