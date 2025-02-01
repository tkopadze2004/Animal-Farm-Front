import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { AudioService } from '../../services/audio.service';
import * as MusicActions from '../actions/music.actions';

@Injectable()
export class MusicEffects {
  private readonly actions$ = inject(Actions);
  private readonly audioService = inject(AudioService);

  loadMusic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.loadMusic),
      switchMap(({ filePath }) =>
        this.audioService.loadAudio(filePath).pipe(
          switchMap((arrayBuffer) =>
            this.audioService.decodeAudio(arrayBuffer).pipe(
              map((audioBuffer) =>
                MusicActions.loadMusicSuccess({ audioBuffer })
              ),
              tap(({ audioBuffer }) => {
                this.audioService.play(audioBuffer);
              })
            )
          ),
          catchError((error) =>
            of(MusicActions.loadMusicFailure({ error: error.message }))
          )
        )
      )
    )
  );

  stopMusic$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MusicActions.stopMusic),
        tap(() => {
          this.audioService.stop();
        })
      ),
    { dispatch: false }
  );
}
