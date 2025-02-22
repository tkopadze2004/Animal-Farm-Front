import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PigStatusService } from '../../services/pig-status.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as pigActions from '../actions/pig.actions';

@Injectable({ providedIn: 'root' })
export class PigEffect {
  private readonly actions$ = inject(Actions);
  private readonly pigStatusService = inject(PigStatusService);
  pigStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pigActions.getPigStatus),
      switchMap(() =>
        this.pigStatusService.getStatus().pipe(
          map((response) =>
            pigActions.getPigStatusSuccess({
              pigStatus: response.status,
            })
          ),
           catchError(({ error }) => {
            const getStatusFail = error?.message || 'Server or network error'
            return of(pigActions.getPigStatusFailure({ statusError: getStatusFail }));
        })
       )
      )
    )
  );

  updatePigStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pigActions.updatePigStatus),
      switchMap(({ pigStatus }) =>
        this.pigStatusService.updatePigStatus(pigStatus).pipe(
          map(() => pigActions.updatePigStatusSuccess({ pigStatus })),
           catchError(({ error }) => {
            const UpdateStatusFail = error?.message || 'Server or network error'
            return of(pigActions.updatePigStatusFailure({ statusUpdateError: UpdateStatusFail }));
        })
      )
     )
    )
  );
}
